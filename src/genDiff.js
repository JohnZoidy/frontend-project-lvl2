import * as fs from 'fs';

const genDiff = (path1, path2) => {
  // define ways
  const file1 = JSON.parse(fs.readFileSync(path1));
  const file2 = JSON.parse(fs.readFileSync(path2));
  // work with objects and return string
};

export default genDiff;
