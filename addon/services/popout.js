import Ember from 'ember';
import Window from '../models/window';

const { merge, typeOf, generateGuid } = Ember;
const { keys } = Object;

function stringifyOptions(options) {
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

export default Ember.Service.extend(Ember.Evented, {
  defaultOptions: {
    width: 500,
    height: 500
  },

  open: function(...args) {
    let options;
    let lastArgument = args[args.length - 1];
    let mergedOptions = merge({}, this.get('defaultOptions'));

    if (typeOf(lastArgument) === 'object') {
      options = lastArgument;
      args.pop();
    }

    mergedOptions = merge(this.get('defaultOptions'), options);

    mergedOptions = merge({
      left: ((screen.width / 2) - (mergedOptions.width / 2)),
      top: ((screen.height / 2) - (mergedOptions.height / 2)),
    }, mergedOptions);

    return Window.create({
      reference: window.open(
        window.location.origin,
        generateGuid(),
        ...args,
        stringifyOptions(mergedOptions)
      )
    });
  }
});
