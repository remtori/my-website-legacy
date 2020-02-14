const fs = require('fs-extra');
const path = require('path');
const createRenderer = require('./preactDOMRenderer');
const config = require('../../config');

module.exports = async function(routes)
{
	const cwd = process.cwd();
	process.chdir(config.distDir);

	try
	{
		if (!await fs.pathExists('./no-prerender.html'))
		{
			await fs.copyFile('./index.html', './no-prerender.html');
		}

		const oldPage = await fs.readFile('./no-prerender.html', { encoding: 'utf8' });
		const template = oldPage.replace(/(\n|\t)/g, '');

		const renderer = createRenderer();
		const { renderHTML } = require(path.join(config.distDir, './prerender/bundle.js'));

		for (const url of routes)
		{
			console.log(`Render route: ${url}`);
			await renderHTML(url, renderer.render);

			const content = renderer.html();
			renderer.tearDown();

			const newPage = template.replace('{{prerender}}', content);

			const htmlPath = '.' + url.replace(/\/$/, '/index') + '.html';

			await fs.ensureDir(path.dirname(htmlPath));

			await fs.writeFile(htmlPath, newPage);
		}
	}
	catch (e)
	{
		console.error(e);
	}

	process.chdir(cwd);
}
