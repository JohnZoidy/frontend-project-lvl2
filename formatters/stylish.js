const cut = (element) => element.substring(4, element.length);

const stylish = (dataIn, replacer = '  ', spacesCount = 1) => {
  const iter = (data, depth) => {
    const insertValue = (value) => {
      if (value === null) {
        return 'null';
      }
      if (typeof value === 'string') {
        return value;
      }
      if (typeof value === 'object' && !Array.isArray(value)) {
        return `${iter(value, depth + 1)}`;
      }
      return value;
    };
    const format = ([key, value], currenReplacer) => {
      if (key.includes('add.')) {
        return `\n${currenReplacer}+ ${cut(key)}: ${insertValue(value)}`;
      }
      if (key.includes('rem.')) {
        return `\n${currenReplacer}- ${cut(key)}: ${insertValue(value)}`;
      }
      if (key.includes('upd.')) {
        return `\n${currenReplacer}- ${cut(key)}: ${insertValue(value[0])}\n${currenReplacer}+ ${cut(key)}: ${insertValue(value[1])}`;
      }
      return `\n${currenReplacer}  ${key}: ${insertValue(value)}`;
    };

    const pairs = Object.entries(data);
    const currentReplacer = replacer.repeat(spacesCount + depth * 2);
    const result = pairs.reduce((acc, [key, value]) => `${acc}${format([key, value], currentReplacer)}`, '');
    return `{${result}\n${replacer.repeat(depth * 2)}}`;
  };
  return iter(dataIn, 0);
};

export default stylish;
