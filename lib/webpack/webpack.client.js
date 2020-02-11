const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const crypto = require('crypto');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const { dev, rootDir } = require('./config');

fs.removeSync(path.join(rootDir, './dist'));

module.exports = merge(baseConfig({ isPrerender: false }), {
	entry: {
        main: path.join(rootDir, './src/index.tsx')
    },
    output: {
        filename: 'assets/js/[name].[contenthash:8].js',
        path: path.join(rootDir, './dist'),
        publicPath: '/',
    },
    plugins: ([
        new webpack.DefinePlugin({
			PRERENDER: false
		}),
        new HTMLWebpackPlugin({
            template: './src/index.ejs',
            inlineSource: 'main.*\.css$',
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
                to: './content',
                // transformPath(targetPath, absPath) {
                //     return fs.readFile(absPath).then(content => {
                //         const hash = crypto
                //                         .createHash('md4')
                //                         .update(content)
                //                         .digest('hex');

                //         const r = path.parse(targetPath);
                //         return `${r.dir}/${name}.${hash.slice(0, 8)}.${ext}`
                //     });
                // }
            }
        ]),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: [
                '!favicon.ico',
                '!manifest.json',
                '!assets/icons/**/*',
                '!assets/images/**/*',
                '!content/**/*'
            ]
        })
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
