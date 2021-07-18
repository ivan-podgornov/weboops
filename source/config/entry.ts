import fs from 'fs';
import path from 'path';

export const entry = (sourcePath: string) => {
    const styles = [
        path.resolve(sourcePath, './stylesheets/style.css'),
        path.resolve(sourcePath, './stylesheets/style.scss'),
    ].filter((filename) => fs.existsSync(filename));

    return {
        styles,
        main: path.resolve(sourcePath, './javascript/main.js'),
    };
};
