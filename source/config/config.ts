import path from 'path';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import { resolveContext, Options } from './context';
import { entry } from './entry';
import { getLoaders } from './loaders';
import { getPlugins } from './plugins';
import type { Configuration } from 'webpack';

export const createConfig = (options: Options): Configuration => {
    const context = resolveContext(options);
    const { cwd, source } = context;

    return {
        context: source,
        mode: 'development',
        entry: entry(source),

        optimization: {
            emitOnErrors: true,
            minimize: context.mode === 'build',
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            "default",
                            { discardComments: { removeAll: true } },
                        ],
                    },
                }),
            ],
        },

        output: {
            filename: context.mode === 'build' && context.filesHashingEnabled
                ? 'scripts/[name]-[contenthash].js'
                : 'scripts/[name].js',
            path: context.output,
            publicPath: context.publicPath,
        },

        module: {
            rules: getLoaders(context),
        },

        plugins: getPlugins(context),

        resolve: {
            alias: {
                components: path.resolve(source, './components/'),
                layouts: path.resolve(source, './layouts/'),
                pages: path.resolve(source, './pages/'),
            },
        },

        devServer: {
            static: {
                directory: path.resolve(cwd, './static/'),
            },
        },
    };
};
