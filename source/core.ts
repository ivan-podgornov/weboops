import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { createConfig } from './config';
import { Options } from './config/context';

export const run = (options: Options) => {
    const config = createConfig(options);
    const compiler = webpack(config);

    switch (options.mode) {
        case 'build': {
            compiler.run((error, stats) => {
                if (error) {
                    console.error(error);
                }

                if (stats) {
                    const statsStr = stats.toString({ colors: true });
                    console.log(statsStr);
                }
            });
            break;
        }
        case 'development': {
            const server = new WebpackDevServer(compiler, config.devServer);
            server.listen(3000);
            break;
        }
    }
}
