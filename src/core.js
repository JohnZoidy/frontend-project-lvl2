import _ from 'lodash';
import customParse from './parsers.js';

const isObject = (object) => typeof object === 'object' && object !== null;

const addSpaces = (object) => {
  const keys = _.keys(object);
  return keys.reduce((acc, key) => {
    if (isObject(object[key])) {
      acc[`  ${key}`] = addSpaces(object[key]);
      return acc;
    }
    acc[`  ${key}`] = object[key];
    return acc;
  }, {});
};

const makeDiffObject = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  const result = keys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isEqual(obj1[key], obj2[key])) {
        acc[`  ${key}`] = obj2[key];
        return acc;
      }
      if (isObject(obj1[key]) && isObject(obj2[key])) {
        acc[`  ${key}`] = makeDiffObject(obj1[key], obj2[key]);
        return acc;
      }
      acc[`- ${key}`] = isObject(obj1[key]) ? addSpaces(obj1[key]) : obj1[key];
      acc[`+ ${key}`] = isObject(obj2[key]) ? addSpaces(obj2[key]) : obj2[key];
      return acc;
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      acc[`+ ${key}`] = isObject(obj2[key]) ? addSpaces(obj2[key]) : obj2[key];
      return acc;
    }
    acc[`- ${key}`] = isObject(obj1[key]) ? addSpaces(obj1[key]) : obj1[key];
    return acc;
  }, {});
  return result;
};

const genDiff = (path1, path2) => {
  const firstObject = customParse(path1);
  const secondObject = customParse(path2);
  return makeDiffObject(firstObject, secondObject);
};

export default genDiff;
