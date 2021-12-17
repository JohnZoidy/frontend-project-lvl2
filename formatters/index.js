import stylish from './stylish.js';
import plain from './plain.js';
import makeJson from './json.js';

const makeFormattedData = (data, formatterName) => {
  switch (formatterName) {
    case 'stylish': {
      return stylish(data);
    }
    case 'plain': {
      return plain(data);
    }
    case 'json': {
      return makeJson(data);
    }
    default: {
      throw new Error('Error: there is no such formatter');
    }
  }
};

export default makeFormattedData;
