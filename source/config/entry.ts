import fs from 'fs';
import path from 'path';
import type { Entry } from 'webpack';

export const entry = (sourcePath: string): Entry => {
    const styles = [
        path.resolve(sourcePath, './stylesheets/style.css'),
        path.resolve(sourcePath, './stylesheets/style.scss'),
    ].filter((filename) => fs.existsSync(filename)) as [string, string];

    return {
        styles,
        main: path.resolve(sourcePath, './javascript/main.js'),
    };
};
