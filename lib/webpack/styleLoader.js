const path = require('path');
const ExtractCssPlugin = require("extract-css-chunks-webpack-plugin");

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