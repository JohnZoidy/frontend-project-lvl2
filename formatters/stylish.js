const stylish = (dataIn, replacer = '  ', spacesCount = 1) => {
  const iter = (data, depth) => {
    const insertValue = (value, property) => {
      if (value === null) {
        return 'null';
      }
      if (value === 'nested') {
        return `${iter(property.children, depth + 1)}`;
      }
      return `${value}`;
    };
    const format = (property, currenReplacer) => {
      if (property.status === 'added') {
        return `\n${currenReplacer}+ ${property.name}: ${insertValue(property.value, property)}`;
      }
      if (property.status === 'removed') {
        return `\n${currenReplacer}- ${property.name}: ${insertValue(property.value, property)}`;
      }
      if (property.status === 'updated') {
        return `\n${currenReplacer}- ${property.name}: ${insertValue(property.oldValue, property)}\n${currenReplacer}+ ${property.name}: ${insertValue(property.value, property)}`;
      }
      if (property.status === 'modified') {
        return `\n${currenReplacer}  ${property.name}: ${insertValue(property.value, property)}`;
      }
      if (property.status === 'unchanged') {
        return `\n${currenReplacer}  ${property.name}: ${insertValue(property.value, property)}`;
      }
      throw new Error(`Error: something wrong in plain formatter - status ${property.status} unexpected in ${property.status}`);
    };
    const currentReplacer = replacer.repeat(spacesCount + depth * 2);
    const result = data.reduce((acc, property) => `${acc}${format(property, currentReplacer)}`, '');
    return `{${result}\n${replacer.repeat(depth * 2)}}`;
  };
  return iter(dataIn, 0);
};

export default stylish;
