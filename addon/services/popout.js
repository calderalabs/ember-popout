import Ember from 'ember';
import Context from 'ember-popout/models/context';

const {
  typeOf,
  merge,
  on
} = Ember;

export default Ember.Service.extend(Ember.Evented, {

  /**
   * A reference to the current application instance.
   * This is used to set the parent of child popouts.
   */
  _self: undefined,

  /**
   * A reference to the application instance in the parent window
   * if the current window is a popout window
   * @property parent
   * @private
   * @default null
   */
  _parent: null,

  /**
   * @method _initializeParent
   * @private
   */
  _initializeParent: on('_setParent', function(parent) {
    this.set('_parent', parent);
  }),

  open(...args) {
    let options;
    let lastArgument = args[args.length - 1];

    if (typeOf(lastArgument) === 'object') {
      options = lastArgument;
      args.pop();
    }

    let context = Context.create(merge({
      url: this.get('container').lookup('router:main').generate(...args),
      _service: this
    }, {options: options}));

    context.open();
    return context;
  }
});
