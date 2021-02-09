const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { root } = require('./utils');

const devServerHost = '127.0.0.1';
const devServerPort = 60001;

const getConfig = (env) => {
    if (!env) {
        env = {};
    }
    const isProd = /true/i.test(env.isProd);
    const runDevServer = /true/i.test(env.runDevServer);

    const config = {
        mode: isProd ? 'production' : 'development',
        entry: [root('./src/bootstrap.ts')],
        output: {
            path: root('./dist'),
            filename: 'app.bundle.js',
            chunkFilename: '[id].js',
        },
        resolve: {
            modules: ['node_modules', root('./src')],
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.mjsx'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: root('tsconfig.json'),
                                transpileOnly: true,
                                projectReferences: true,
                                compilerOptions: {
                                    declarationMap: false,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Kindle widget',
                filename: 'index.html',
                inject: 'body',
            }),
        ],
    };

    if (runDevServer) {
        config.output.publicPath = `http://${devServerHost}:${devServerPort}/`;
        config.devServer = {
            clientLogLevel: 'none',
            hot: true,
            inline: true,
            overlay: true,
            port: devServerPort,
            host: devServerHost,
            historyApiFallback: true,
            disableHostCheck: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000,
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers':
                    'X-Requested-With, content-type, Authorization',
            },
        };
    }

    return config;
};

module.exports = getConfig;
