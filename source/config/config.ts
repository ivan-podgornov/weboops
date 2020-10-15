import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import type { Configuration, WebpackPluginInstance } from 'webpack';

export const createConfig = (): Configuration => {
    const cwd = path.resolve(process.cwd(), './source/');

    return {
        mode: 'development',

        entry: {
            styles: path.resolve(cwd, './stylesheets/style.css'),
        },

        optimization: {
            emitOnErrors: true,
        },

        output: {
            filename: 'scripts/[name].js',
            path: path.resolve(cwd, '../public/'),
        },

        module: {
            rules: [
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
                        'css-loader'
                    ],
                },
            ],
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HTMLWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(cwd, './pages/index.pug'),
            }),
            new MiniCssExtractPlugin({
                filename: 'stylesheets/style.css',
                ignoreOrder: true,
            }) as WebpackPluginInstance,
        ],

        resolve: {
            alias: {
                components: path.resolve(cwd, './components/'),
                layouts: path.resolve(cwd, './layouts/'),
                pages: path.resolve(cwd, './pages/'),
            },
        },

        devServer: {
            contentBase: path.resolve(cwd, '../static/'),
        },
    };
};
