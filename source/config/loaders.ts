import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function getLoaders() {
    return [
        files(),
        pug(),
        css(),
    ];
};

function files() {
    return {
        test: /\.(svg|png|jpe?g)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
                path: 'images',
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
