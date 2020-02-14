const path = require('path');

module.exports = {
	dev: process.env.NODE_ENV !== 'production',
	// Directory
	rootDir: __dirname,
	distDir: path.join(__dirname, './dist'),
	srcDir: path.join(__dirname, './src'),
	contentDir: path.join(__dirname, './site-content'),
	cacheDir: path.join(
		process.env.NETLIFY_BUILD_BASE || __dirname,
		`cache`,
	),
};
