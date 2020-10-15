#!/usr/bin/env node

import { program } from 'commander';
import { run } from './core';
import type { Options } from './config/context';

program
    .option('-m, --mode <build|development>', 'build or development')
    .option('--publicPath <path>', 'webpack public path', '/')
    .parse(process.argv);

const options: Options = {
    mode: program.opts().mode,
    publicPath: program.opts().publicPath as string,
};

if (!['build', 'development'].includes(options.mode)) {
    throw new TypeError('mode must be build or development');
}

run(options);
