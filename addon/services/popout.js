import Ember from 'ember';
import Context from 'ember-popout/models/context';

const { typeOf, merge, inject } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  open(...args) {
    let options;
    let lastArgument = args[args.length - 1];

    if (typeOf(lastArgument) === 'object') {
      options = lastArgument;
      args.pop();
    }

    let context = Context.create(merge({
      url: this.get('container').lookup('router:main').generate(...args)
    }, {options: options}));

    context.open();
    return context;
  }
});
