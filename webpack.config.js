const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';

const config = {
    mode: dev ? 'development' : 'production',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: '[name].[hash:8].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, './build')
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                include: [ path.resolve(__dirname, './src/components') ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                exclude: [ path.resolve(__dirname, './src/components') ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, './src'),
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    fallback: 'file-loader',
                    limit: 8192
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                minifyJS: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].[hash:8].css"
        }),
        new CopyWebpackPlugin([
            { from: './src/assets/images/icons/favicon.ico', to: './' },
            { from: './src/manifest.json', to: './' },
            {
                from: './src/assets/images/icons/*',
                to: './assets/images/icons/[name].[ext]'
            }
        ]),
        new WorkboxPlugin.InjectManifest({
            swDest: 'sw.js',
            swSrc: './src/sw.js'
        })
    ],
    optimization: {
        minimize: !dev,
        minimizer: [ new UglifyJsPlugin() ],
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
    devServer: {
        historyApiFallback: true,
        port: 8080,
        compress: false,
        contentBase: './src'
    }
};

!dev && config.plugins.push(
    new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
            reportFilename: path.resolve(__dirname, './build/bundle-report.html')
    })
)

module.exports = config;