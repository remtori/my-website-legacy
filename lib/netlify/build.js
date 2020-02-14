const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const config = require('../../config');
const {
	restoreCache,
	refillCache,
	update_published_commit,
} = require('./utils');

const renderRoutes = require('../prerender/render-routes');

async function build() {
	await restoreCache();

	const versionFilePath = path.join(config.distDir, './version');
	const distVersion = await getDistVersion(versionFilePath);
	const currVersion = require(path.join(config.rootDir, './package.json')).version;

	console.log(`Distributed bundle version: ${distVersion}`);
	console.log(`Current bundle version    : ${currVersion}`);

	let routes;
	if (distVersion !== currVersion) {
		console.log(`Distributed version is out-of-date, rebuild everything`);
		await makeWebpackBundle();

		const index = require(path.join(config.contentDir, './generated/index.json'));
		routes = index.documents
			.filter(doc => doc.lang === 'en')
			.map(doc => doc.content);
	} else {
		const patch = require(path.join(config.contentDir, './generated/patch.json'));

		const remover = patch.remove
			.map(u => '.' + u.replace(/\/$/, '/index') + '.html')
			.map(p => fs.remove(path.join(config.distDir, p)));

		await Promise.all(remover);
		routes = patch.update;
	}

	await renderRoutes(routes);

	!process.env.TEST && await update_published_commit();
	await fs.writeFile(versionFilePath, currVersion, 'utf8');
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

build().catch(console.log);
