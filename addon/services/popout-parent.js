import Ember from 'ember';
import stringifyOptions from 'ember-popout/lib/stringify-options';

export default Ember.Service.extend({

  windowMessengerServer: Ember.inject.service(),

  popouts: undefined,

  init(...args) {
    this._super(...args);
    this.set('popouts', {});
    this.set('actionListeners', Ember.A());
    this.get('windowMessengerServer').on('receive-action', (resolve, reject, { name, args }) => {
      resolve(); // always resolve - it's the receivers responsibility to process the action
      let actionListeners = this.get('actionListeners');
      actionListeners.forEach((listener) => {
        listener.send(name, ...args);
      });
    });
  },

  listenToActions(target) {
    let actionListeners = this.get('actionListeners');
    actionListeners.pushObject(target);
  },

  open(id, ...args) {
    let options;
    let lastArgument = args[args.length - 1];

    if (Ember.typeOf(lastArgument) === 'object') {
      options = lastArgument;
      args.pop();
    } else {
      options = {};
    }

    let mergedOptions = Object.assign({
      left: ((screen.width / 2) - (options.width / 2)),
      top: ((screen.height / 2) - (options.height / 2)),
    }, options);

    let url = Ember.getOwner(this).lookup('router:main').generate(...args);

    let reference = window.open(url, id, stringifyOptions(mergedOptions));

    let popouts = this.get('popouts');

    this.popouts[id] = reference;
  },

  close(id) {
    let popouts = this.get('popouts');
    let popout = popouts[id];
    _closeWindow(popout);
    delete popouts.id;
  },

  closeAll() {
    let popouts = this.get('popouts');
    Object.keys(popouts).forEach(function(id) {
      let popout = popouts[id];
      _closeWindow(popout);
    });
    this.set('popouts', {});
  },
});

function _closeWindow(win) {
  if (Ember.typeOf(win) === 'object' && Ember.typeOf(win.close) === 'function') {
    win.close();
  }
}
