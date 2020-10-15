import path from 'path';
import { resolveContext, Options } from './context';
import { getLoaders } from './loaders';
import { getPlugins } from './plugins';
import type { Configuration } from 'webpack';

export const createConfig = (options: Options): Configuration => {
    const context = resolveContext(options);
    const { cwd, sourcesPath } = context;

    return {
        mode: 'development',

        entry: {
            styles: path.resolve(sourcesPath, './stylesheets/style.css'),
        },

        optimization: {
            emitOnErrors: true,
        },

        output: {
            filename: 'scripts/[name].js',
            path: path.resolve(sourcesPath, '../docs/'),
            publicPath: options.publicPath,
        },

        module: {
            rules: getLoaders(context),
        },

        plugins: getPlugins(context),

        resolve: {
            alias: {
                components: path.resolve(sourcesPath, './components/'),
                layouts: path.resolve(sourcesPath, './layouts/'),
                pages: path.resolve(sourcesPath, './pages/'),
            },
        },

        devServer: {
            contentBase: path.resolve(cwd, './static/'),
        },
    };
};
