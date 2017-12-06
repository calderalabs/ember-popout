import Ember from 'ember';
import stringifyOptions from 'ember-popout/utils/stringify-options';
import locationOrigin from 'ember-popout/utils/location-origin';

export default Ember.Service.extend({

  windowMessengerServer: Ember.inject.service(),

  popouts: undefined,

  popoutNames: undefined,

  init(...args) {
    this._super(...args);
    this._resetPopouts();
    this.set('actionListeners', Ember.A());
    let parent = locationOrigin();
    this.get('windowMessengerServer').set('targetOriginMap', { parent });
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

    const { popouts, popoutNames } = this.getProperties('popouts', 'popoutNames');

    if (reference) {
      popouts[id] = reference;
      popoutNames.pushObject(id);

      reference.onunload = function() {
        if (reference.location.href !== 'about:blank') {
          Ember.run(function() {
            delete popouts[id];
            popoutNames.removeObject(id);
          });
        }
      };
    }

    return reference;
  },

  close(id) {
    const { popouts, popoutNames } = this.getProperties('popouts', 'popoutNames');
    const popout = popouts[id];
    _closeWindow(popout);
    delete popouts[id];
    popoutNames.removeObject(id);
  },

  closeAll() {
    const { popouts, popoutNames } = this.getProperties('popouts', 'popoutNames');
    popoutNames.forEach(id => _closeWindow(popouts[id]));
    this._resetPopouts();
  },

  _resetPopouts() {
    this.setProperties({
      popouts: {},
      popoutNames: Ember.A()
    });
  }
});

function _closeWindow(win) {
  if (Ember.typeOf(win) === 'object' && Ember.typeOf(win.close) === 'function') {
    win.close();
  }
}
