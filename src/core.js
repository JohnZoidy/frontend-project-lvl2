import _ from 'lodash';
import customParse from './parsers.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import makeJson from '../formatters/json.js';

const isObject = (object) => typeof object === 'object' && object !== null;

const makeDiffObject = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  const result = keys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isEqual(obj1[key], obj2[key])) {
        acc[`${key}`] = obj2[key];
        return acc;
      }
      if (isObject(obj1[key]) && isObject(obj2[key])) {
        acc[`${key}`] = makeDiffObject(obj1[key], obj2[key]);
        return acc;
      }
      acc[`upd.${key}`] = [obj1[key], obj2[key]]; // from .. to ..
      return acc;
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      acc[`add.${key}`] = obj2[key];
      return acc;
    }
    acc[`rem.${key}`] = obj1[key];
    return acc;
  }, {});
  return result;
};

const genDiff = (path1, path2, formatName) => {
  const firstObject = customParse(path1);
  const secondObject = customParse(path2);
  const data = makeDiffObject(firstObject, secondObject);
  switch (formatName) {
    case 'stylish': {
      const result = stylish(data);
      console.log(result);
      return result;
    }
    case 'plain': {
      const result = plain(data);
      console.log(result);
      return result;
    }
    case 'json': {
      const result = makeJson(data);
      console.log(JSON.stringify(result));
      return result;
    }
    default: {
      console.log('there is no such formatter');
      return 'there is no such formatter';
    }
  }
};

export default genDiff;
