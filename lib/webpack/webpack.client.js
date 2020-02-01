const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const cwd = process.cwd();
const dev = process.env.NODE_ENV !== 'production';

/** Assets Generator */
require('../generator');

/** Remove ./dist */
require('rimraf').sync('./dist');

module.exports = merge(baseConfig({ isPrerender: false }), {
	entry: {
        main: path.join(cwd, './src/index.tsx')
    },
    output: {
        filename: 'assets/js/[name].[hash:8].js',
        path: path.join(cwd, './dist'),
        publicPath: '/',
    },
    plugins: ([
        new webpack.DefinePlugin({
			PRERENDER: false
		}),
        new HTMLWebpackPlugin({
            template: './src/index.ejs',
            inlineSource: '\/main.*\.(js|css)$',
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                minifyJS: true,
                removeComments: true,
            },
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new CopyWebpackPlugin([
            {
                from: './src/assets/icons/favicon.ico',
                to: './'
            },
            {
                from: './src/manifest.json',
                to: './'
            },
            {
                from: './src/assets/icons',
                to: './assets/icons'
            },
            {
                from: './src/assets/images',
                to: './assets/images'
            },
            {
                from: './site-content/content',
                to: './content'
            }
        ]),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: [
                '!assets/images/**/*',
                '!assets/icons/**/*',
                '!content/**/*',
                '!manifest.json',
                '!favicon.ico',
            ]
        }),
    ]).concat(dev ? [] : [
        new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false })
    ]),
    optimization: {
		minimize: !dev,
		minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
            })
        ],
        splitChunks: {
            chunks: 'all'
        }
    },
});
