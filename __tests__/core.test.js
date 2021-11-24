import { test, expect } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/core.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFileData = (filename) => fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });

test('gendiff test', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(getFileData(getFixturePath('1 and 2.txt')));
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('file1.json'))).toEqual(getFileData(getFixturePath('2 and 1.txt')));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file1.json'))).toEqual(getFileData(getFixturePath('1 and 1.txt')));
  expect(genDiff(getFixturePath('file3.json'), getFixturePath('file4.json'))).toEqual(getFileData(getFixturePath('3 and 4.txt')));
});
