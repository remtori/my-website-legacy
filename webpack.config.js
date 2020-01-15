const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const minCssModuleName = require('./libs/minCssModuleName');

const dev = process.env.NODE_ENV !== 'production';

const DefinePluginConfig = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
});

const useCssModuleFolders = [
    path.join(__dirname, './src/components'),
    path.join(__dirname, './src/screens'),
];

function styleLoader({ useCssModule })
{
    return [
        {
            loader: ExtractCssChunks.loader,
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2,
                modules: useCssModule && {
                    getLocalIdent: minCssModuleName
                },
                sourceMap: true,
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: function () {
                    return [
                        require('autoprefixer')
                    ];
                },
                sourceMap: true,
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sassOptions: {
                    includePaths: [
                        path.join(__dirname, './src')
                    ]
                },
                sourceMap: true,
            }
        }
    ];
}

module.exports = {
    entry: {
        sites: path.join(__dirname, '/src/index.tsx')
    },
    mode: dev ? 'development' : 'production',
    output: {
        filename: './assets/js/[name].[hash:8].js',
        path: path.join(__dirname, './dist'),
        publicPath: '/',
    },
    resolve: {
        alias: {
            '~': path.join(__dirname, './src'),
            'react': 'preact/compat',
            'react-dom': 'preact/compat',
        },
        extensions: [
            '.ts', '.tsx', '.js', '.jsx',
            '.scss', '.sass', '.css',
            '.json'
        ]
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, './src'),
                loader: 'babel-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },

            {
                test: /\.s(a|c)ss$/,
                include: useCssModuleFolders,
                exclude: /node_modules/,
                use: styleLoader({ useCssModule: true })
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: [
                    /node_modules/,
                    ...useCssModuleFolders
                ],
                use: styleLoader({ useCssModule: false })
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: ExtractCssChunks.loader
                    },
                    {
                        loader: 'css-loader'
                    }
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    fallback: 'file-loader',
                },
            },
        ],
    },
    plugins: ([
        new ExtractCssChunks({
            filename: './assets/styles/[name].[hash:8].css',
            chunkFilename: './assets/styles/[name].[contenthash:8].css'
        }),
        new HTMLWebpackPlugin({
            //template: `!!prerender-loader?string!${path.join(__dirname, './src/index.ejs')}`,
            template: './src/index.ejs',
            inlineSource: '',
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
            }
        ]),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: [
                '!assets/images/**/*',
                '!assets/icons/**/*',
                '!manifest.json',
                '!favicon.ico',
                '!blogs/**/*',
            ]
        }),
    ]).concat(dev ? [] : [
        DefinePluginConfig,
        new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
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
};
