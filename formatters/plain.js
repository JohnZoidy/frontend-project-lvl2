const cut = (element) => element.substring(4, element.length);

const checkValue = (value) => {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return value;
};

const plain = (dataIn) => {
  const iter = (data, depth) => {
    const ifObject = (key, value) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        return `${iter(value, `${depth}${key}.`)}`;
      }
      return '';
    };
    const format = ([key, value]) => {
      if (key.includes('add.')) {
        return `\nProperty '${depth}${cut(key)}' was added with value: ${checkValue(value)}`;
      }
      if (key.includes('rem.')) {
        return `\nProperty '${depth}${cut(key)}' was removed`;
      }
      if (key.includes('upd.')) {
        return `\nProperty '${depth}${cut(key)}' was updated. From ${checkValue(value[0])} to ${checkValue(value[1])}`;
      }
      return ifObject(key, value);
    };

    const pairs = Object.entries(data);
    const result = pairs.reduce((acc, [key, value]) => `${acc}${format([key, value])}`, '');
    return `${result}`;
  };
  return iter(dataIn, '').trim();
};

export default plain;
