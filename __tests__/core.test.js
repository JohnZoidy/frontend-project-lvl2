import { test, expect } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/core.js';
import stylish from '../src/formatters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFileData = (filename) => fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });

const jsonData1 = genDiff(getFixturePath('file1.JSON'), getFixturePath('file2.json'));
const ymlData1 = genDiff(getFixturePath('file1.YML'), getFixturePath('file2.yaml'));
const resultData1 = getFileData(getFixturePath('1 and 2.txt'));

test('JSON test', () => {
  expect(stylish(jsonData1)).toEqual(resultData1);
});

test('YAML test', () => {
  expect(stylish(ymlData1)).toEqual(resultData1);
});
