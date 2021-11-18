#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import _ from 'lodash';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {});

program.parse();
// const options = program.opts();
// if (options.type) console.log(`- ${options.type}`);