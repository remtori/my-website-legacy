const fs = require('fs-extra');
const path = require('path');
const fetch = require('node-fetch');
const config = require('../../config');
const { exec } = require('child_process');

const buildDir = config.distDir;
const cacheDir = path.join(config.cacheDir, 'remtori_site');

async function restoreCache()
{
	await fs.ensureDir(cacheDir);

	await fs.copy(cacheDir, buildDir);

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
async function update_published_commit() {

	const url = `https://api.github.com/repos/remtori/my-website-content/contents/generated/published_commit`;

	console.group(`Updating published commit`);

	console.log(`Getting previous published_commit`);
	const resp = await fetch(url).then(r => r.json());
	console.log(resp);

	const { sha, content, encoding } = resp;

	const realContent = Buffer.from(content, encoding).toString('ascii');
	console.log(`Previous sha1 hash : ${realContent}`);
	console.log(`Current sha1 hash  : ${process.env.COMMIT_REF}`);

	if (!process.env.COMMIT_REF || !process.env.GITHUB_TOKEN) {
		console.log(`Oops, ${process.env.COMMIT_REF ? 'GITHUB_TOKEN' : 'COMMIT_REF'} is undefined`);
		console.groupEnd();
		return;
	}

	console.log(`Pushing current published_commit`);
	const r = await fetch(url, {
		method: "PUT",
		headers: {
			'Authorization': `token ${process.env.GITHUB_TOKEN}`
		},
		body: JSON.stringify({
			sha,
			message: `[travis-ci skip] Update published_commit`,
			content: Buffer.from(process.env.COMMIT_REF).toString('base64'),
			committer: {
				name: 'Netlify CI',
				email: 'netlify@netlify.com'
			}
		})
	});

	console.log(await r.text());
	console.groupEnd();
}

function execute(script) {
	return new Promise((resolve, reject) => {
		exec(script, (err, stdout, stderr) => {
			if (err) return reject(new Error(err));
			resolve(stdout || stderr);
		})
	});
}

module.exports = {
	execute,
	restoreCache,
	refillCache,
	update_published_commit,
};
