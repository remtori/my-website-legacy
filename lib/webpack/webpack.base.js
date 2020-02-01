const path = require('path');
const styleLoader = require('./styleLoader');
const ExtractCssPlugin = require("extract-css-chunks-webpack-plugin");

const cwd = process.cwd();
const srcDir = path.join(cwd, './src');
const dev = process.env.NODE_ENV !== 'production';

const useCssModuleFolders = [
    path.join(srcDir, './components'),
];


module.exports = ({ isPrerender }) => ({
    mode: dev ? 'development' : 'production',
    resolve: {
        alias: {
            '~': srcDir,
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
            }
        ],
    },
    plugins: [
        new ExtractCssPlugin({
            filename: `assets/styles/[name].[hash:8].css`,
            chunkFilename: `assets/styles/[name].[contenthash:8].css`
        }),
    ]
});
