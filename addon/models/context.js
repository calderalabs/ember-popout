import Ember from 'ember';
import generateUuid from 'ember-popout/lib/generate-uuid';
import stringifyOptions from 'ember-popout/lib/stringify-options';

const { run, merge, computed, RSVP } = Ember;

export default Ember.Object.extend({
  mergedProperties: ['options'],

  _reference: null,
  _application: null,
  _router: null,
  _popout: null,

  isOpen: false,
  url: window.location.origin,

  id: computed(function() {
    return generateUuid();
  }),

  options: {
    width: 500,
    height: 500
  },

  _initializeLookups() {
    let container = this.get('_application.container');

    this.set('_router', container.lookup('router:main'));
    this.set('_popout', container.lookup('service:ember-popout'));
  },

  open() {
    let options = this.get('options');
    let reference;

    let mergedOptions = merge({
      left: ((screen.width / 2) - (options.width / 2)),
      top: ((screen.height / 2) - (options.height / 2)),
    }, options);

    reference = window.open(
      this.get('url'),
      this.get('id'),
      stringifyOptions(mergedOptions)
    );

    this.set('_reference', reference);

    return new RSVP.Promise((resolve) => {
      reference.addEventListener('ember-popout:initialize', (event) => {
        run(this, function() {
          this.set('_application', event.detail.application);
          this._initializeLookups();
          this.set('isOpen', true);
          resolve();
        });
      });

      reference.addEventListener('unload', () => {
        this.set('isOpen', false);
      });
    });
  },

  close() {
    let reference = this.get('_reference');

    if (reference != null) {
      reference.close();
    }
  },

  sendAction(...args) {
    this.send(`route:${this.get('_router.currentRouteName')}`, ...args);
  },

  send(channel, ...args) {
    let popout = this.get('_popout');

    if (popout != null) {
      this.get('_popout').trigger(channel, ...args);
    }
  }
});
