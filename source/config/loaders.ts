import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Context } from './context';

export function getLoaders(context: Context) {
    return [
        files(context),
        pug(),
        css(),
    ];
};

function files(context: Context) {
    return {
        test: /\.(svg|png|jpe?g)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: 'images/[path][name].[ext]',
                publicPath: context.publicPath,
            },
        },
    };
}

function pug() {
    return {
        test: /\.pug$/,
        use: {
            loader: 'pug-loader',
            options: {
                pretty: true,
            },
        },
    };
}

function css() {
    return {
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
    };
}
