#!/usr/bin/env node

import { program } from 'commander';
import { run } from './core';
import type { Options } from './config/context';

program
    .option('-m, --mode <build|development>', 'build or development')
    .option('-s, --source <path>', 'weboops sources', './source/')
    .option('-o, --output <path>', 'weboops outputs', './dist/')
    .option('--publicPath <path>', 'webpack public path', '/')
    .parse(process.argv);

const options: Options = {
    mode: program.opts().mode,
    output: program.opts().output as string,
    publicPath: program.opts().publicPath as string,
    source: program.opts().source as string,
};

if (!['build', 'development'].includes(options.mode)) {
    throw new TypeError('mode must be build or development');
}

run(options);
