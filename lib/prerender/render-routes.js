const fs = require('fs-extra');
const path = require('path');
const createRenderer = require('./preactDOMRenderer');

const routes = require('../../site-content/generated/routes.json');
const distDir = path.join(__dirname, '../../dist');

module.exports = async function()
{
	try
	{
		process.chdir(distDir);
		if (!await fs.pathExists('./no-prerender.html'))
		{
			await fs.copyFile('./index.html', './no-prerender.html');
		}

		const oldPage = await fs.readFile('./no-prerender.html', { encoding: 'utf8' });

		const renderer = createRenderer();
		const { renderHTML } = require('./prerender/bundle.js');

		for (const url of routes)
		{
			await renderHTML(url, renderer.render);

			const content = renderer.html();
			renderer.tearDown();

			const newPage = oldPage
				.replace('{{prerender}}', content)
				.replace(/(\n|\t)/g, '');

			const htmlPath = '.' + url.replace(/\/$/, '/index') + '.html';

			await fs.ensureDir(path.dirname(htmlPath));

			await fs.writeFile(htmlPath, newPage);
		}
	}
	catch (e)
	{
		console.error(e);
	}
}
