import path from 'path';

export type WeboopsMode = 'build'|'development';
export type Context = {
    /** Path where user run weboops */
    cwd: string,

    /** Path that will be used for webpack public path */
    publicPath: string,

    /**
     * build - just build sources to output
     * development - build source and watch for changes
     */
    mode: WeboopsMode,

    /** Folder with sources, pages, etc. */
    sourcesPath: string,
};

export type Options = {
    mode: WeboopsMode,
    publicPath: string,
}

export const resolveContext = (options: Options): Context => {
    const cwd = process.cwd();
    const sourcesPath = path.resolve(cwd, './source/');

    return {
        ...options,
        cwd,
        sourcesPath,
    };
};
