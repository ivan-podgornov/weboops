import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Compilation, Compiler } from 'webpack';

type HtmlPluginData = {
    html: string,
    outputName: string,
    plugin: HtmlWebpackPlugin,
};

type BeforeEmitCallback = (error: Error|null, data: HtmlPluginData) => void;

type Options = {
    publicPath: string,
};

export class RewriteHtmlUrlsPlugin {
    readonly name = 'RewriteHtmlUrlsPlugin';

    constructor(private options: Options) {}

    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap(this.name, (compilation: Compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                this.name,
                this.rewriteUrls.bind(this),
            );
        });
    }

    rewriteUrls(data: HtmlPluginData, callback: BeforeEmitCallback) {
        const regexp = /<img (.*?)?src="\//gm;
        const publicPath = this.options.publicPath;
        const html = data.html.replace(regexp, `<img $1src="${publicPath}`);
        return callback(null, { ...data, html });
    }
}
