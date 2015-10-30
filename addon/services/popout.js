import Ember from 'ember';
import Window from 'ember-popout/models/window';

const { typeOf, isPresent } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  open(...args) {
    let options;
    let lastArgument = args[args.length - 1];

    if (typeOf(lastArgument) === 'object') {
      options = lastArgument;
      args.pop();
    }

    let context = Window.create(options);

    return context.open().then(function() {
      if (isPresent(args)) {
        return context.transitionTo(...args);
      }
    }).then(function() {
      return context;
    });
  }
});
