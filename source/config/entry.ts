import fs from 'fs';
import path from 'path';
import type { Entry } from 'webpack';

export const entry = (sourcePath: string): Entry => {
    const entry: Entry = {
        main: path.resolve(sourcePath, './javascript/main.js'),
    };

    const styles = [
        path.resolve(sourcePath, './stylesheets/main.css'),
        path.resolve(sourcePath, './stylesheets/main.scss'),
    ].filter((filename) => fs.existsSync(filename)) as [string, string];

    if (styles.length) entry.styles = styles;

    return entry;
};
