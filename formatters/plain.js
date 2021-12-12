const valueToString = (value) => {
  if (value === null) {
    return 'null';
  }
  if (value === 'nested') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (dataIn) => {
  const iter = (data, depth = '') => {
    const format = (element) => {
      if (element.status === 'added') {
        return `\nProperty '${depth}${element.name}' was added with value: ${valueToString(element.value)}`;
      }
      if (element.status === 'removed') {
        return `\nProperty '${depth}${element.name}' was removed`;
      }
      if (element.status === 'updated') {
        return `\nProperty '${depth}${element.name}' was updated. From ${valueToString(element.oldValue)} to ${valueToString(element.value)}`;
      }
      if (element.status === 'modified') {
        return iter(element.children, `${depth}${element.name}.`);
      }
      if (element.status === 'unchanged') {
        return '';
      }
      throw new Error(`Error: something wrong in plain formatter - status ${element.status} unexpected in ${element.status}`);
    };
    const result = data.reduce((acc, element) => `${acc}${format(element)}`, '');
    return result;
  };
  return iter(dataIn).trim();
};

export default plain;
