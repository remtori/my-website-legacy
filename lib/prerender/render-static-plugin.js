const path = require('path');
const renderRoutes = require('./render-routes');
const config = require('../../config');

const PLUGIN_NAME = 'Remtori-Render-Static';

module.exports = class RenderStatic
{
	apply(compiler)
	{
		compiler.hooks.done.tapPromise(PLUGIN_NAME, () => {


			return renderRoutes(routes);
		});
	}
}
