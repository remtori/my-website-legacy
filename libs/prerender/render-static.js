const fs = require('fs');
const validateOptions = require('schema-utils');

const PLUGIN_NAME = 'Remtori-Render-Static';

const schema = {
	type: 'object',
	properties: {
		pathToSSR: {
			type: 'string'
		},
		pathToIndex: {
			type: 'string'
		}
	}
};

module.exports = class RenderStatic
{
	constructor(opts)
	{
		validateOptions(schema, opts, PLUGIN_NAME);
		this.opts = opts;
	}

	getHTML(bundler)
	{
		if (typeof bundler === 'function')
			return bundler();

		for (const k in bundler)
			if (typeof bundler[k] === 'function')
				return bundler[k]();

		return 'ERROR: No export function found';
	}

	apply(compiler)
	{
		compiler.hooks.done.tapPromise(PLUGIN_NAME, async () =>
		{
			const result = this.getHTML(require(this.opts.pathToSSR));
			let content = fs.readFileSync(this.opts.pathToIndex, { encoding: 'utf8' });
			content = content.replace('{{prerender}}', result);
			content = content.replace(/(\n|\t)/g, '')
			fs.writeFileSync(this.opts.pathToIndex, content);
		});
	}
}
