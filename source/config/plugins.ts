import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { WebpackPluginInstance } from 'webpack';
import { Context } from './context';

export function getPlugins(context: Context) {
    return [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(context.sourcesPath, './pages/index.pug'),
        }),
        new MiniCssExtractPlugin({
            filename: 'stylesheets/style.css',
            ignoreOrder: true,
        }) as WebpackPluginInstance,
    ]
}
