#!/usr/bin/env node

import { program } from 'commander';
import { run } from './core';

program
    .option('-m, --mode <build|development>', 'build or development')
    .parse(process.argv);

const mode = program.opts().mode;
if (mode !== 'build' && mode !== 'development') {
    throw new TypeError('mode must be build or development');
}

run(mode);
