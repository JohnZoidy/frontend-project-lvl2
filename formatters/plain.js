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
    const format = (property) => {
      if (property.status === 'added') {
        return `\nProperty '${depth}${property.name}' was added with value: ${valueToString(property.value)}`;
      }
      if (property.status === 'removed') {
        return `\nProperty '${depth}${property.name}' was removed`;
      }
      if (property.status === 'updated') {
        return `\nProperty '${depth}${property.name}' was updated. From ${valueToString(property.oldValue)} to ${valueToString(property.value)}`;
      }
      if (property.status === 'modified') {
        return iter(property.children, `${depth}${property.name}.`);
      }
      if (property.status === 'unchanged') {
        return '';
      }
      throw new Error(`Error: something wrong in plain formatter - status ${property.status} unexpected in ${property.status}`);
    };
    const result = data.reduce((acc, property) => `${acc}${format(property)}`, '');
    return result;
  };
  return iter(dataIn).trim();
};

export default plain;
