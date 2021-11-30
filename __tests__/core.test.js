import { test, expect } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/core.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFileData = (filename) => fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });

const jsonDataStylish = genDiff(getFixturePath('file1.JSON'), getFixturePath('file2.json'), 'stylish');
const ymlDataStylish = genDiff(getFixturePath('file1.YML'), getFixturePath('file2.yaml'), 'stylish');
const jsonDataPlain = genDiff(getFixturePath('file1.JSON'), getFixturePath('file2.json'), 'plain');
const ymlDataPlain = genDiff(getFixturePath('file1.YML'), getFixturePath('file2.yaml'), 'plain');
const failFormatter = genDiff(getFixturePath('file1.YML'), getFixturePath('file2.yaml'), 'test');
const resultDataStylish = getFileData(getFixturePath('1-2stylish.txt'));
const resultDataPlain = getFileData(getFixturePath('1-2plain.txt'));
const jsonDataJson = genDiff(getFixturePath('file1.JSON'), getFixturePath('file2.json'), 'json');
const ymlDataJson = genDiff(getFixturePath('file1.YML'), getFixturePath('file2.yaml'), 'stylish');

test('JSON file test', () => {
  expect((jsonDataStylish)).toEqual(resultDataStylish);
  expect((jsonDataPlain)).toEqual(resultDataPlain);
  expect((typeof JSON.stringify(jsonDataJson))).toBe('string');
});

test('YAML file test', () => {
  expect((ymlDataStylish)).toEqual(resultDataStylish);
  expect((ymlDataPlain)).toEqual(resultDataPlain);
  expect((typeof JSON.stringify(ymlDataJson))).toBe('string');
});

test('Formatter test', () => {
  expect((failFormatter)).toEqual('there is no such formatter');
});
