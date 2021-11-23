import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (path1, path2) => {
  const firstFile = path.resolve(path1);
  const secondFile = path.resolve(path2);
  const file1 = JSON.parse(fs.readFileSync(firstFile));
  const file2 = JSON.parse(fs.readFileSync(secondFile));
  console.log(firstFile);
  console.log(secondFile);
  const keys = _.sortBy(_.union(_.keys(file1), _.keys(file2)));
  const result = keys.reduce((acc, key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      return file1[key] === file2[key] ? `${acc}    ${key}:${file1[key]}\n` : `${acc}  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return `${acc}  + ${key}: ${file2[key]}\n`;
    }
    return `${acc}  - ${key}: ${file1[key]}\n`;
  }, '{\n');
  console.log(`${result}}`);
  // return as object
  /*
  const result = keys.reduce((acc, key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] === file2[key]) {
        acc[`  ${key}`] = file2[key];
        return acc;
      }
      acc[`- ${key}`] = file1[key];
      acc[`+ ${key}`] = file2[key];
      return acc;
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      acc[`+ ${key}`] = file2[key];
      return acc;
    }
    acc[`- ${key}`] = file1[key];
    return acc;
  }, {});
  console.log(result);
  */
};

export default genDiff;
