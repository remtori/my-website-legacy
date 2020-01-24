const renderRoutes = require('./render-routes');
const PLUGIN_NAME = 'Remtori-Render-Static';

module.exports = class RenderStatic
{
	constructor(opts)
	{
		this.opts = opts;
	}

	apply(compiler)
	{
		compiler.hooks.done.tapPromise(
			PLUGIN_NAME,
			renderRoutes(this.opts.context, this.opts.paths)
		);
	}
}
