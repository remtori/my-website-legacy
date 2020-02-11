const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const RenderStaticPlugin = require('../prerender/render-static-plugin');
const { dev, rootDir } = require('./config');

module.exports = merge(baseConfig({ isPrerender: true }), {
	externals: {
		preact: 'preact',
		firebase: 'firebase',
	},
	entry: {
		bundle: path.join(rootDir, './src/prerender.tsx')
	},
	output: {
		filename: '[name].js',
		path: path.join(rootDir, './dist/prerender'),
		libraryTarget: 'commonjs2',
		publicPath: '/',
	},
	plugins: [
		// new RenderStaticPlugin(),
		new webpack.DefinePlugin({
			PRERENDER: true
		}),
		new CleanWebpackPlugin(),
	],
	optimization: {
		splitChunks: false
	},
	target: 'node'
});