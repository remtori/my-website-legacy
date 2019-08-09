const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

const DefinePluginConfig = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
});

module.exports = {
    devServer: {
        host: 'localhost',
        port: '80',
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true,
    },
    entry: [
        path.join(__dirname, '/src/index.tsx')
    ],
    mode: dev ? 'development' : 'production',
    output: {
        filename: '[name].[hash:8].bundle.js',
        path: path.join(__dirname, '/build'),
        publicPath: '/',
    },
    resolve: {
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
                include: [
                    path.resolve(__dirname, './src/components'),
                ],
                exclude: /node_modules/,
                use: [{
                        loader: ExtractCssChunks.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: '[local]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname, './src/components'),
                ],
                use: [{
                        loader: ExtractCssChunks.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
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
            filename: '[name].[hash].css',
            chunkFilename: '[id].[contenthash:8].css'
        }),
        new HTMLWebpackPlugin({
            template: './src/index.ejs',
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                minifyJS: true,
                removeComments: true,
            },
        }),
        new CopyWebpackPlugin([{
                from: './src/assets/images/icons/favicon.ico',
                to: './'
            },
            {
                from: './src/manifest.json',
                to: './'
            },
            {
                from: './src/assets',
                to: './assets'
            }
        ]),
    ]).concat(
        dev ? [
            new webpack.HotModuleReplacementPlugin()
        ] : [
            DefinePluginConfig,
            new CleanWebpackPlugin(),
            new BundleAnalyzerPlugin({ analyzerMode: 'static' })
        ]
    ),
    optimization: {
        minimize: !dev,
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: 'initial',
                    minChunks: 1,
                    minSize: 0
                },
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
            }
        }
    },
};