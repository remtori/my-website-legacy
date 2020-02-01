const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const cwd = process.cwd();
const RenderStaticPlugin = require('../prerender/render-static-plugin');

module.exports = merge(baseConfig({ isPrerender: true }), {
	entry: {
		ssr: path.join(cwd, './src/prerender.tsx')
	},
	output: {
		filename: 'bundle.js',
		path: path.join(cwd, './dist/prerender'),
		libraryTarget: 'commonjs2',
		publicPath: '/',
	},
	plugins: [
		new RenderStaticPlugin({
			context: path.join(cwd, './dist'),
			paths: {
				html: './index.html',
				bundledSSR: './prerender/bundle.js',
			}
		}),
		new webpack.DefinePlugin({
			PRERENDER: true
		}),
	],
	optimization: {
		splitChunks: false
	},
	target: 'node'
});