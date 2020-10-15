import { resolveContext, WeboopsMode } from './context';
import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import type { Configuration, WebpackPluginInstance } from 'webpack';

export const createConfig = (mode: WeboopsMode): Configuration => {
    const context = resolveContext(mode);
    const { cwd, sourcesPath } = context;

    return {
        mode: 'development',

        entry: {
            styles: path.resolve(sourcesPath, './stylesheets/style.css'),
        },

        optimization: {
            emitOnErrors: true,
        },

        output: {
            filename: 'scripts/[name].js',
            path: path.resolve(sourcesPath, '../public/'),
            publicPath: '/',
        },

        module: {
            rules: [
                {
                    test: /\.(svg|png|jpe?g)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            path: 'images',
                        },
                    },
                },
                {
                    test: /\.pug$/,
                    use: {
                        loader: 'pug-loader',
                        options: {
                            pretty: true,
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: (url: string) => !url.startsWith('/'),
                            },
                        },
                    ],
                },
            ],
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HTMLWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(sourcesPath, './pages/index.pug'),
            }),
            new MiniCssExtractPlugin({
                filename: 'stylesheets/style.css',
                ignoreOrder: true,
            }) as WebpackPluginInstance,
        ],

        resolve: {
            alias: {
                components: path.resolve(sourcesPath, './components/'),
                layouts: path.resolve(sourcesPath, './layouts/'),
                pages: path.resolve(sourcesPath, './pages/'),
            },
        },

        devServer: {
            contentBase: path.resolve(cwd, './static/'),
        },
    };
};
