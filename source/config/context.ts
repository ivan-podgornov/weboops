import path from 'path';

export type WeboopsMode = 'build'|'development';

export const resolveContext = (mode: WeboopsMode) => {
    const cwd = process.cwd();
    const sourcesPath = path.resolve(cwd, './source/');
    return { cwd, mode, sourcesPath };
};
