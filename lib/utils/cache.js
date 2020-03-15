const fs = require('fs-extra');
const path = require('path');
const config = require('../../config');

const buildDir = config.distDir;
const cacheDir = path.join(config.cacheDir, 'remtori_site');

async function restoreCache()
{
	await fs.ensureDir(cacheDir);

	await fs.remove(buildDir);

	await fs.copy(cacheDir, buildDir);

	console.log(`Cached build restored`);
}

async function refillCache()
{
	await fs.ensureDir(cacheDir);

	await fs.remove(cacheDir);

	await fs.copy(buildDir, cacheDir);

	console.log(`Cached build refilled`);
}

module.exports = {
	restoreCache,
	refillCache,
};
