const path = require('path');
const minCssModuleName = require('../minCssModuleName');
const ExtractCssPlugin = require("mini-css-extract-plugin");

const dev = process.env.NODE_ENV !== 'production';
const srcDir = path.join(process.cwd(), './src');

module.exports = function styleLoader({ useCssModule })
{
    return ([
        {
            loader: ExtractCssPlugin.loader,
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2,
                modules: useCssModule && (
                    dev ? { localIdentName: '[local]__[hash:base64:4]' }
                        : { localIdentName: '[hash:base64:4]' }
                        // : { getLocalIdent: minCssModuleName }
                ),
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
                    includePaths: [ srcDir ]
                },
                sourceMap: true,
            }
        }
    ]).filter(Boolean);
}
