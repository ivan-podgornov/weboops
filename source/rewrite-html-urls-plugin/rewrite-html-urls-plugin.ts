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

    rewriteUrls(data: HtmlPluginData, callback: BeforeEmitCallback): void {
        const publicPath = this.options.publicPath;
        const regexp = new RegExp(
            `(?<tag>a|img|video|source) (?<between>.*?)?(?<attr>src|href|srcset)="\/(?!${publicPath.slice(1)})`,
            'gm',
        );
        const html = data.html.replace(regexp, `$<tag> $<between>$<attr>="${publicPath}`);
        const newData = { ...data, html };

        if (regexp.test(newData.html)) {
            return this.rewriteUrls(newData, callback);
        }

        callback(null, newData);
    }
}
