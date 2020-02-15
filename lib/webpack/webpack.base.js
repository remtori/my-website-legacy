const path = require('path');
const webpack = require('webpack');
const styleLoader = require('./style-loader');
const ExtractCssPlugin = require("extract-css-chunks-webpack-plugin");

const { dev, srcDir } = require('../../config');

const useCssModuleFolders = [
    path.join(srcDir, './components'),
];

module.exports = ({ isPrerender }) => ({
    mode: dev ? 'development' : 'production',
    resolve: {
        alias: {
            '~': srcDir
        },
        extensions: [
            '.ts', '.tsx', '.js', '.jsx',
            '.scss', '.sass', '.css',
            '.json'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.s(a|c)ss$/,
                include: useCssModuleFolders,
                exclude: /node_modules/,
                use: styleLoader({ useCssModule: true, isPrerender })
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: [
                    /node_modules/,
                    ...useCssModuleFolders
                ],
                use: styleLoader({ useCssModule: false, isPrerender })
            },
            {
                test: /\.css$/,
                use: ([
                    !isPrerender && ExtractCssPlugin.loader,
                    'css-loader'
                ]).filter(Boolean),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    fallback: 'file-loader',
                },
            },
            {
                type: 'javascript/auto',
                test: /\/generated\/[^\/]+\.json$/i,
                loader: 'file-loader',
                options: {
                    emitFile: !isPrerender,
                    name: 'assets/[name].[contenthash:8].[ext]'
                }
            }
        ],
    },
    plugins: [
        new ExtractCssPlugin({
            filename: `assets/styles/[name].[contenthash:8].css`,
            chunkFilename: `assets/styles/[name].[contenthash:8].css`
        })
    ]
});
