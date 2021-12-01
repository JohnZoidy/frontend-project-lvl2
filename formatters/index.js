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
      console.log(JSON.stringify(result));
      return result;
    }
    default: {
      console.log('there is no such formatter');
      return 'there is no such formatter';
    }
  }
};

export default pickFormatter;
