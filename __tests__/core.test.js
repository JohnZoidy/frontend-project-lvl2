import { test, expect } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/core.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFileData = (filename) => fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });

const getTestData = (filename1, filename2, formatter) => {
  const result = genDiff(getFixturePath(filename1), getFixturePath(filename2), formatter);
  return result;
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
      throw new Error('Error: there is no such formatter');
    }
  }
};

const formatters = ['stylish', 'plain', 'json'];

test('Main test', () => {
  formatters.map((formatter) => expect((getTestData('file1.JSON', 'file2.json', formatter))).toEqual(getResultData(formatter)));
  formatters.map((formatter) => expect((getTestData('file1.YML', 'file2.yaml', formatter))).toEqual(getResultData(formatter)));
});

test('Throw test', () => {
  expect(() => getTestData('file1.JSON', 'file2.json', 'test')).toThrow('Error: there is no such formatter');
  expect(() => getTestData('file1.JSON', 'file2.txt')).toThrow('Error: unsupported format of file');
});
