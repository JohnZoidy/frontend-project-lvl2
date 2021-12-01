import { test, expect } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/core.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFileData = (filename) => fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });

const gendiffData = (filename1, filename2, formatter) => {
  const result = genDiff(getFixturePath(filename1), getFixturePath(filename2), formatter);
  return formatter === 'json' ? JSON.stringify(result) : result;
};

const getResultData = (formatter) => {
  switch (formatter) {
    case 'stylish': {
      return getFileData(getFixturePath('1-2stylish.txt'));
    }
    case 'plain': {
      return getFileData(getFixturePath('1-2plain.txt'));
    }
    case 'json': {
      return getFileData(getFixturePath('1-2json.txt'));
    }
    default: {
      return 'there is no such formatter';
    }
  }
};

const formatters = ['stylish', 'plain', 'test', 'json'];

test('Main test', () => {
  formatters.map((formatter) => expect((gendiffData('file1.JSON', 'file2.json', formatter))).toEqual(getResultData(formatter)));
  formatters.map((formatter) => expect((gendiffData('file1.YML', 'file2.yaml', formatter))).toEqual(getResultData(formatter)));
});
