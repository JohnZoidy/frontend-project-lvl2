const cut = (element) => element.substring(4, element.length);

const makeJson = (dataIn) => {
  const iter = (data) => {
    const insertValue = (value, old = false) => {
      if (value === null) {
        return old ? { oldValue: value } : { value };
      }
      if (typeof value === 'string') {
        return old ? { oldValue: value } : { value };
      }
      if (typeof value === 'object' && !Array.isArray(value)) {
        return old ? { oldValue: value } : { value: 'nested', children: iter(value) };
      }
      return old ? { oldValue: value } : { value };
    };
    const ifModifiedObject = (key, value) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        return {
          name: key, value: 'nested', status: 'modified', children: iter(value),
        };
      }
      return {
        name: key, value, status: 'unchanged',
      };
    };
    const format = ([key, value]) => {
      if (key.includes('add.')) {
        return {
          name: cut(key), status: 'added', ...insertValue(value),
        };
      }
      if (key.includes('rem.')) {
        return {
          name: cut(key), status: 'removed', ...insertValue(value),
        };
      }
      if (key.includes('upd.')) {
        return {
          name: cut(key), ...insertValue(value[1]), status: 'updated', ...insertValue(value[0], true),
        };
      }
      return ifModifiedObject(key, value);
    };

    const pairs = Object.entries(data);
    const result = pairs.reduce((acc, [key, value]) => [...acc, format([key, value])], []);
    return result;
  };
  return JSON.stringify(iter(dataIn));
};

export default makeJson;
