import path from 'path';
import type { Entry } from 'webpack';

export const entry = (sourcePath: string): Entry => {
    return {
        main: path.resolve(sourcePath, './javascript/main.js'),
    };
};
