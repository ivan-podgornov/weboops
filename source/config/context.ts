import path from 'path';

export type WeboopsMode = 'build'|'development';
export type Context = {
    /** Path where user run weboops */
    cwd: string,

    /**
     * build - just build sources to output
     * development - build source and watch for changes
     */
    mode: WeboopsMode,

    /** Folder with sources, pages, etc. */
    sourcesPath: string,
};

export const resolveContext = (mode: WeboopsMode): Context => {
    const cwd = process.cwd();
    const sourcesPath = path.resolve(__dirname, '../../example/source');
    return { cwd, mode, sourcesPath };
};
