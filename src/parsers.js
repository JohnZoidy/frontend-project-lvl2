import * as fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const customParse = (filepath) => {
  const fullPath = path.resolve(filepath);
  const format = path.extname(fullPath).toLowerCase();
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(fs.readFileSync(fullPath, 'utf8'));
  }
  if (format === '.json') {
    return JSON.parse(fs.readFileSync(fullPath));
  }
  throw new Error('Error: unsupported format of file');
};

export default customParse;
