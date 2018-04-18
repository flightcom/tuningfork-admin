const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// Webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

// Location of files
const srcFolder = 'app';
const buildFolder = 'dist';

const PATHS = {
    app: path.join(__dirname, srcFolder),
    build: path.join(__dirname, buildFolder),
};

const commonConfig = {
    entry: PATHS.app,

    resolve: {
        modules: [
            srcFolder,
            'node_modules',
        ],
        extensions: [
            '.js',
            '.jsx',
        ],
    },

    output: {
        path: PATHS.build,
        publicPath: '/',
    },

    // Make web variables accessible to webpack, e.g. window
    target: 'web',

    performance: { hints: false },

    stats: 'errors-only',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets:['react']
                }
            }, {
                // For building vendor css files
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            }, {
                test: /\.(eot|svg|ttf|woff2?)$/,
                loader: 'file-loader',
            }, {
                test: /\.(jpe?g|png|gif)$/,
                loaders: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                        },
                    },
                ],
            }, {
                test: /\.(mp4|webm)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                },
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `"development"`,
            __DEV__: false,
            __PROD__: false,
        }),
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV` inside your code for any environment check
        new webpack.optimize.ModuleConcatenationPlugin(),
        // Favicons
        new CopyWebpackPlugin([
            {
                from: path.join(PATHS.app, 'assets/favicons'),
                to: PATHS.build,
            },
        ]),
    ],
};

const devConfig = {
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    // There is issues with cheap-module-eval-source-map and Chrome
    devtool: 'cheap-module-source-map',

    // WebpackDevServer specific
    devServer: {
        host,
        port,

        // respond to 404s with index.html
        historyApiFallback: true,

        // Location of files
        contentBase: PATHS.build,

        stats: 'errors-only',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(PATHS.app, 'index.ejs'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
        }),

        // new FriendlyErrorsPlugin(),
    ],
};

const prodConfig = {
    output: {
        // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },

    devtool: 'source-map',

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: isVendor, // eslint-disable-line no-use-before-define
        }),

        // Minify and optimize the index.html
        new HtmlWebpackPlugin({
            template: path.join(PATHS.app, 'index.ejs'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,
        }),
    ],
};

const devPlugins = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `"development"`,
            __DEV__: true,
        }),
    ]
};

const prodPlugins = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `"production"`,
            __PROD__: true,
        }),
    ]
};


function isVendor({ resource }) {
    return (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
    );
}


module.exports = (env) => {
    if (env ==='development') {
        process.env.BABEL_ENV = env;
    } else {
        process.env.BABEL_ENV = 'production';
    }

    if (env === 'development') {
        return merge(devPlugins, commonConfig, devConfig);
    }

    return merge(prodPlugins, commonConfig, prodConfig);
};
