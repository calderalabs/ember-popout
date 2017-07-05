const { keys } = Object;

export default function stringifyOptions(options) {
  return keys(options).map(function(key) {
    let value = options[key];
    let stringValue;

    if (value === true) {
      stringValue = '1';
    } else if (value === false) {
      stringValue = '0';
    } else {
      stringValue = value;
    }

    return `${key}=${stringValue}`;
  }).join(',');
}
