import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (path1, path2) => {
  // define ways
  const firstFile = path.resolve(path1);
  const secondFile = path.resolve(path2);
  const file1 = JSON.parse(fs.readFileSync(firstFile));
  const file2 = JSON.parse(fs.readFileSync(secondFile));
  console.log(firstFile);
  console.log(secondFile);

  // work with objects and return string
};

export default genDiff;
