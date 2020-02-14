const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { srcDir, distDir } = require('../../config');

module.exports = merge(baseConfig({ isPrerender: true }), {
	externals: {
		preact: 'preact',
		firebase: 'firebase',
	},
	entry: {
		bundle: path.join(srcDir, './prerender.tsx')
	},
	output: {
		filename: '[name].js',
		path: path.join(distDir, './prerender'),
		libraryTarget: 'commonjs2',
		publicPath: '/',
	},
	plugins: [
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