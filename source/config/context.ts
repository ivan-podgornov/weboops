import path from 'path';

export type WeboopsMode = 'build'|'development';
export type Options = {
    /**
     * build - just build sources to output
     * development - build source and watch for changes
     */
    mode: WeboopsMode,

    /**
     * Directory where weboops output build files. It can be both relative and
     * absolute path. If it's relative, means that relative from directory where
     * user run weboops.
     */
    output?: string;

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

    /**
     * If true, files created by build will be created with hashes. For example file.fjskdwr.js
     * @default true
     */
    filesHashingEnabled?: boolean;
}

export type Context = {
    filesHashingEnabled: boolean;
    cwd: string,
    mode: WeboopsMode,
    output: string,
    publicPath: string,
    source: string,
};

export function resolveContext(options: Options): Context {
    const cwd = process.cwd();
    const output = getDirectory(cwd, './dist/', options.output);
    const source = getDirectory(cwd, './source/', options.source);
    const { mode, publicPath = '/', filesHashingEnabled = false } = options;

    return {
        filesHashingEnabled, cwd, source, mode,
        output, publicPath,
    };
};

function getDirectory(cwd: string, def: string, pathLike?: string) {
    const dir = pathLike || path.resolve(cwd, def);
    return path.isAbsolute(dir) ? dir : path.resolve(cwd, dir);
}
