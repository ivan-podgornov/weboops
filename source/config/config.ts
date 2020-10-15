import path from 'path';
import { resolveContext, WeboopsMode } from './context';
import { getLoaders } from './loaders';
import { getPlugins } from './plugins';
import type { Configuration } from 'webpack';

export const createConfig = (mode: WeboopsMode): Configuration => {
    const context = resolveContext(mode);
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
            path: path.resolve(sourcesPath, '../public/'),
            publicPath: '/',
        },

        module: {
            rules: getLoaders(),
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
