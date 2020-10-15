import fs from 'fs';
import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { WebpackPluginInstance } from 'webpack';
import { Context } from './context';

export function getPlugins(context: Context) {
    return [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'stylesheets/style.css',
            ignoreOrder: true,
        }) as WebpackPluginInstance,
        ...getHtmlPlugins(context),
    ]
}

function getHtmlPlugins(context: Context) {
    const pagesFolder = path.resolve(context.sourcesPath, './pages/');
    const pages = fs.readdirSync(pagesFolder)
        .filter((filename) => path.extname(filename) === '.pug');

    return pages.map((filename) => new HTMLWebpackPlugin({
        filename: path.basename(filename, path.extname(filename)) + '.html',
        template: path.resolve(pagesFolder, `./${filename}`),
    }));
}
