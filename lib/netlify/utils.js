const fs = require('fs-extra');
const path = require('path');
const fetch = require('node-fetch');
const config = require('../../config');
const { exec } = require('child_process');

const buildDir = config.distDir;
const cacheDir = path.join(config.cacheDir, 'remtori_site');

const cwdUtils = {
	stack: [ process.cwd() ],
	top() {
		return this.stack.length === 0 ? '.' : this.stack[this.stack.length - 1];
	},
	push(dir) {
		process.chdir(dir);
		this.stack.push(process.cwd());
	},
	pop() {
		this.stack.pop();
		process.chdir(this.top());
	}
}

async function restoreCache()
{
	await fs.ensureDir(cacheDir);

	await fs.remove(buildDir);

	await fs.copy(cacheDir, buildDir);

	await fs.remove(cacheDir);

	console.log(`Cached build restored`);
}

async function refillCache()
{
	await fs.ensureDir(cacheDir);

	await fs.copy(buildDir, cacheDir);

	console.log(`Cached build refilled`);
}

/**
 * Expect input, 2 environment variable:
 *
 * GITHUB_TOKEN: Github API Token for Authentication, set by Netlify Setting UI
 *
 * COMMIT_REF: sha1 hash of current commit, set by Netlify build environment
 *             detail: https://docs.netlify.com/configure-builds/environment-variables/#git-metadata
 */
async function updatePublishedCommit() {

	console.group(`Updating published commit`);

	cwdUtils.push(config.contentDir);

	const filePath = './generated/published_commit';
	const prevSha1 = await fs.readFile(filePath, 'utf8');

	const logResult = await execute(`git log -1 --no-decorate`);
	const currSha1 = /commit\s([a-f0-9]+)/i.exec(logResult)[1];

	console.log(`Previous sha1 hash : ${prevSha1}`);
	console.log(`Current sha1 hash  : ${currSha1}`);

	await fs.writeFile(filePath, currSha1, 'utf8');

	if (!process.env.GITHUB_TOKEN) {
		console.log(`Oops, GITHUB_TOKEN is "${process.env.GITHUB_TOKEN}"`);
		console.groupEnd();
		cwdUtils.pop();
		return;
	}

	cwdUtils.pop();
	cwdUtils.push(__dirname);
	console.log(await execute(`sh ./push_content.sh`));
	cwdUtils.pop();
	console.groupEnd();
}

function execute(script) {
	return new Promise((resolve, reject) => {
		exec(script, (err, stdout, stderr) => {
			if (err) return reject(new Error(err));
			resolve(stdout + (stderr || ''));
		})
	});
}

module.exports = {
	execute,
	restoreCache,
	refillCache,
	updatePublishedCommit,
	cwdUtils,
};
