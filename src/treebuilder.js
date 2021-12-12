import _ from 'lodash';

const isObject = (object) => _.isObject(object) && !_.isNull(object);

const makeNested = (val, isOld = false) => {
  if (_.isObject(val)) {
    const pairs = Object.entries(val);
    const nested = pairs.reduce((acc, [key, valueIn]) => [...acc, { name: key, status: 'unchanged', ...makeNested(valueIn) }], []);
    return isOld ? { oldValue: 'nested', children: nested } : { value: 'nested', children: nested };
  }
  return isOld ? { oldValue: val } : { value: val };
};
const makeDiffObject = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  const result = keys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isEqual(obj1[key], obj2[key])) {
        return [...acc, {
          name: key, status: 'unchanged', ...makeNested(obj2[key]),
        }];
      }
      if (isObject(obj1[key]) && isObject(obj2[key])) {
        return [...acc, {
          name: key, status: 'modified', value: 'nested', children: makeDiffObject(obj1[key], obj2[key]),
        }];
      }
      return [...acc, {
        name: key, status: 'updated', value: obj2[key], ...makeNested(obj1[key], true),
      }];
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return [...acc, {
        name: key, status: 'added', ...makeNested(obj2[key]),
      }];
    }
    return [...acc, {
      name: key, status: 'removed', ...makeNested(obj1[key]),
    }];
  }, []);
  return result;
};

export default makeDiffObject;
