import Ember from 'ember';
import Window from 'ember-popout/models/window';

const { typeOf, merge, inject } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  open(...args) {
    let options;
    let lastArgument = args[args.length - 1];

    if (typeOf(lastArgument) === 'object') {
      options = lastArgument;
      args.pop();
    }

    let context = Window.create(merge({
      url: this.get('container').lookup('router:main').generate(...args)
    }, options));

    return context.open().then(function() {
      return context;
    });
  }
});
