const renderRoutes = require('./render-routes');
const PLUGIN_NAME = 'Remtori-Render-Static';

module.exports = class RenderStatic
{
	apply(compiler)
	{
		compiler.hooks.done.tapPromise(PLUGIN_NAME, renderRoutes);
	}
}
