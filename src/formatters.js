const stylish = (dataIn, replacer = '  ', spacesCount = 1) => {
  const iter = (data, depth) => {
    if (typeof data === 'string') {
      return data;
    }
    if (typeof data === 'boolean') {
      return data === true ? 'true' : 'false';
    }
    if (typeof data === 'number') {
      return `${data}`;
    }
    if (data === null) {
      return 'null';
    }
    const pairs = Object.entries(data);
    const currentSpaces = spacesCount + depth * 2;
    const result = pairs.reduce((acc, item) => {
      if (typeof item[1] === 'object') {
        return `${acc}\n${replacer.repeat(currentSpaces)}${item[0]}: ${iter(item[1], depth + 1)}`;
      }
      return `${acc}\n${replacer.repeat(currentSpaces)}${item[0]}: ${item[1]}`;
    }, '');
    return `{${result}\n${replacer.repeat(currentSpaces - spacesCount)}}`;
  };
  return iter(dataIn, 0);
};

export default stylish;
