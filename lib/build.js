const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const config = require('../config');

const { pushToGithub } = require('./utils/git');
const { genContentData } = require('./utils/content');
const { restoreCache, refillCache } = require('./utils/cache');

const renderRoutes = require('./prerender/render-routes');

async function build() {
	await restoreCache();

	const versionFilePath = path.join(config.distDir, './version');
	const distVersion = await getDistVersion(versionFilePath);
	const currVersion = require(path.join(config.rootDir, './package.json')).version;

	console.log(`Distributed bundle version: ${distVersion}`);
	console.log(`Current bundle version    : ${currVersion}`);

	const routes = await getRoutes(distVersion, currVersion);
	await renderRoutes(routes);

	await fs.writeFile(versionFilePath, currVersion, 'utf8');
	await pushToGithub();

	await refillCache();
}

function makeWebpackBundle() {
	return new Promise((resolve, reject) => {
		const proc = spawn(`npm`, [ 'run', 'build' ], { stdio: 'inherit' });
		proc.on('exit', (code) => {
			if (code !== 0) return reject();
			resolve();
		});
		proc.on('error', reject);
	});
}

async function getDistVersion(versionFilePath) {
	let distVersion = '0.0.0';
	try {
		distVersion = await fs.readFile(versionFilePath, 'utf8');
	} catch(e) {}

	return distVersion;
}

async function getRoutes(distVersion, currVersion) {

	const { index, patch } = await genContentData();

	if (process.env.REBUILD === 'true' || distVersion !== currVersion) {
		console.log(`Distributed version is out-of-date, rebuild everything`);
		await makeWebpackBundle();

		return index.documents
			.filter(doc => doc.lang === 'en')
			.map(doc => doc.content);
	}

	const removers = patch.remove
		.map(u => '.' + u.replace(/\/$/, '/index') + '.html')
		.map(p => fs.remove(path.join(config.distDir, p)));

	await Promise.all(removers);

	return patch.update;
}

build().catch(console.log);
