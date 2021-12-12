const stylish = (dataIn, replacer = '  ', spacesCount = 1) => {
  const iter = (data, depth) => {
    const insertValue = (value, element) => {
      if (value === null) {
        return 'null';
      }
      if (value === 'nested') {
        return `${iter(element.children, depth + 1)}`;
      }
      return `${value}`;
    };
    const format = (element, currenReplacer) => {
      if (element.status === 'added') {
        return `\n${currenReplacer}+ ${element.name}: ${insertValue(element.value, element)}`;
      }
      if (element.status === 'removed') {
        return `\n${currenReplacer}- ${element.name}: ${insertValue(element.value, element)}`;
      }
      if (element.status === 'updated') {
        return `\n${currenReplacer}- ${element.name}: ${insertValue(element.oldValue, element)}\n${currenReplacer}+ ${element.name}: ${insertValue(element.value, element)}`;
      }
      if (element.status === 'modified') {
        return `\n${currenReplacer}  ${element.name}: ${insertValue(element.value, element)}`;
      }
      if (element.status === 'unchanged') {
        return `\n${currenReplacer}  ${element.name}: ${insertValue(element.value, element)}`;
      }
      throw new Error(`Error: something wrong in plain formatter - status ${element.status} unexpected in ${element.status}`);
    };
    const currentReplacer = replacer.repeat(spacesCount + depth * 2);
    const result = data.reduce((acc, element) => `${acc}${format(element, currentReplacer)}`, '');
    return `{${result}\n${replacer.repeat(depth * 2)}}`;
  };
  return iter(dataIn, 0);
};

export default stylish;
