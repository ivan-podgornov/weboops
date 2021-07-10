import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Context } from './context';

export function getLoaders(context: Context) {
    return [
        files(context),
        pug(),
        css(),
        sass(),
    ];
};

function files(context: Context) {
    const hash = context.mode === 'build' ? '-[contenthash]' : '';

    return {
        test: /\.(svg|png|jpe?g)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: `images/[path]/[name]${hash}.[ext]`,
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

function sass() {
    const { use: cssUse } = css();
    return {
        test: /\.scss$/,
        use: [
            ...cssUse,
            {
                loader: 'sass-loader',
                options: {
                    implementation: require('sass'),
                },
            },
        ],
    };
}
