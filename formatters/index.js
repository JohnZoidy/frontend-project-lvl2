import stylish from './stylish.js';
import plain from './plain.js';
import makeJson from './json.js';

const pickFormatter = (data, formatName) => {
  switch (formatName) {
    case 'stylish': {
      const result = stylish(data);
      console.log(result);
      return result;
    }
    case 'plain': {
      const result = plain(data);
      console.log(result);
      return result;
    }
    case 'json': {
      const result = makeJson(data);
      console.log(result);
      return result;
    }
    default: {
      throw new Error('Error: there is no such formatter');
    }
  }
};

export default pickFormatter;
