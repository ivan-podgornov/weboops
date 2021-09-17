import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Context } from './context';

export function getLoaders(context: Context) {
    return [
        files(context),
        pug(),
        css(context),
        sass(context),
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

function css(context: Context) {
    const postcssPlugins = [];
    if (context.mode === 'build') {
        postcssPlugins.push(require('cssnano')({
            preset: 'default',
        }));
    }

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
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: postcssPlugins,
                    },
                },
            },
        ],
    };
}

function sass(context: Context) {
    const { use: cssUse } = css(context);
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
