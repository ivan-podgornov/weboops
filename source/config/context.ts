import path from 'path';

export type WeboopsMode = 'build'|'development';
export type Options = {
    /**
     * build - just build sources to output
     * development - build source and watch for changes
     */
    mode: WeboopsMode,

    /** Path that will be used for webpack public path */
    publicPath?: string,

    /**
     * Path to weboops sources. There must be folders with names
     * "pages", "stylesheets", etc. By default, weboops will search sources
     * in directory where user run weboops in "source" folder. You can specify
     * absolute path or relative. Relative means relative from directory
     * where from user run weboops.
     */
    source?: string,
}

export type Context = {
    cwd: string,
    mode: WeboopsMode,
    publicPath: string,
    source: string,
};

export function resolveContext(options: Options): Context {
    const cwd = process.cwd();
    const source = resolveSourcesDir(cwd, options);
    const { mode, publicPath = '/' } = options;
    return { cwd, source, mode, publicPath };
};

function resolveSourcesDir(cwd: string, options: Options) {
    const source = options.source || path.resolve(cwd, './source');
    return path.isAbsolute(source) ? source : path.resolve(cwd, source);
}
