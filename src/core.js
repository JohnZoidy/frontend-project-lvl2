import path from 'path';
import makeDiffObject from './treebuilder.js';
import customParse from './parsers.js';
import makeFormattedData from '../formatters/index.js';

const parseData = (filepath) => {
  const fullPath = path.resolve(filepath);
  const format = path.extname(fullPath).toLowerCase();
  return customParse(fullPath, format);
};

const genDiff = (path1, path2, formatName = 'stylish') => {
  const firstObject = parseData(path1);
  const secondObject = parseData(path2);
  const data = makeDiffObject(firstObject, secondObject);
  return makeFormattedData(data, formatName);
};

export default genDiff;
