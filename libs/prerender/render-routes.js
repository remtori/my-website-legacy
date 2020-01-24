const fs = require('fs');
const util = require('util');
const path = require('path');
const createRenderer = require('./preactDOMRenderer');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const rename = util.promisify(fs.rename);

module.exports = function(context, paths)
{
	return async function()
	{
		Object.keys(paths).forEach(path => {
			paths[key] = path.join(context, paths[key]);
		});

		paths.noPrerender = path.join(context, './no-prerender.html');

		try
		{
			const oldPage = await readFile(paths.html, { encoding: 'utf8' });
			await rename(indexPath, paths.noPrerender);

			const renderer = createRenderer();
			const { renderHTML, getRoutes } = require(paths.bundledSSR);

			await renderHTML('/', renderer.render);

			const newPage = oldPage
				.replace('{{prerender}}', renderer.html())
				.replace(/(\n|\t)/g, '');

			await writeFile(pathToIndex, newPage);
		}
		catch (e)
		{
			console.error(e);
		}
	}
}