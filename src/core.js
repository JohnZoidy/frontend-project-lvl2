import path from 'path';
import makeDiffObject from './treebuilder.js';
import customParse from './parsers.js';
import pickFormatter from '../formatters/index.js';

const getParserData = (filepath) => {
  const fullPath = path.resolve(filepath);
  const format = path.extname(fullPath).toLowerCase();
  if (format === '.yml' || format === '.yaml') {
    return [fullPath, 'yml'];
  }
  if (format === '.json') {
    return [fullPath, 'json'];
  }
  throw new Error('Error: unsupported format of file');
};

const genDiff = (path1, path2, formatName = 'stylish') => {
  const firstObject = customParse(getParserData(path1));
  const secondObject = customParse(getParserData(path2));
  const data = makeDiffObject(firstObject, secondObject);
  return pickFormatter(data, formatName);
};

export default genDiff;
