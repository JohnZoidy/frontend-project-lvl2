import * as fs from 'fs';
import yaml from 'js-yaml';

const customParse = ([fullPath, format]) => {
  if (format === 'yml') {
    return yaml.load(fs.readFileSync(fullPath, 'utf8'));
  }
  if (format === 'json') {
    return JSON.parse(fs.readFileSync(fullPath));
  }
  throw new Error('Error: unsupported format of file');
};

export default customParse;
