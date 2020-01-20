const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const cwd = process.cwd();
const RenderStaticPlugin = require('../prerender/render-static');

module.exports = merge(baseConfig({ isPrerender: true }), {
	entry: {
		ssr: path.join(cwd, './src/prerender.tsx')
	},
	output: {
		filename: 'prerender/bundle.js',
		path: path.join(cwd, './dist'),
		libraryTarget: 'commonjs',
		publicPath: '/',
	},
	plugins: [
		new RenderStaticPlugin({
			pathToSSR: path.join(cwd, './dist/prerender/bundle.js'),
			pathToIndex: path.join(cwd, './dist/index.html'),
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