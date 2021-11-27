#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../src/core.js';
import stylish from '../src/formatters.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const data = genDiff(filepath1, filepath2);
    const result = options.format === 'stylish' ? stylish(data) : 'there is no such formatter';
    console.log(result);
    return result;
  });

program.parse();
