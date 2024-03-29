import fs from 'fs';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { WebpackPluginInstance } from 'webpack';
import { RewriteHtmlUrlsPlugin } from '../rewrite-html-urls-plugin';
import { Context } from './context';

export function getPlugins(context: Context) {
    const hash = context.mode === 'build' && context.filesHashingEnabled ? '-[contenthash]' : '';

    return [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `stylesheets/[name]${hash}.css`,
            ignoreOrder: true,
        }) as WebpackPluginInstance,
        new RewriteHtmlUrlsPlugin(context),
        ...getHtmlPlugins(context),
        ...buildPlugins(context),
    ];
}

function buildPlugins(context: Context) {
    return [
        new CopyWebpackPlugin({
            patterns: [{
                noErrorOnMissing: true,
                from: path.resolve(context.source, '../static/'),
                to: context.output,
            }],
        }),
    ];
}

function getHtmlPlugins(context: Context) {
    try {
        const pagesFolder = path.resolve(context.source, './pages/');
        const pages = fs.readdirSync(pagesFolder)
            .filter((filename) => path.extname(filename) === '.pug');

        return pages.map((filename) => new HTMLWebpackPlugin({
            filename: path.basename(filename, path.extname(filename)) + '.html',
            template: path.resolve(pagesFolder, `./${filename}`),
        }));
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return [];
        throw error;
    }
}
