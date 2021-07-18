import path from 'path';
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
        },

        output: {
            filename: context.mode === 'build'
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
            contentBase: path.resolve(cwd, './static/'),
        },
    };
};
