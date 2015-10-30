import Ember from 'ember';
import generateUuid from 'ember-popout/lib/generate-uuid';
import stringifyOptions from 'ember-popout/lib/stringify-options';

const { run, merge, computed, RSVP } = Ember;

export default Ember.Object.extend({
  mergedProperties: ['options'],
  reference: null,
  application: null,
  router: null,
  popout: null,
  url: window.location.origin,

  id: computed(function() {
    return generateUuid();
  }),

  options: {
    width: 500,
    height: 500
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

    this.set('reference', reference);

    return new RSVP.Promise((resolve, _) => {
      reference.addEventListener('ember-popout:initialize', (event) => {
        run(this, function() {
          this.set('application', event.detail.application);
          this.initializeLookups();
          resolve();
        });
      });
    });
  },

  initializeLookups() {
    let application = this.get('application');
    this.set('router', application.container.lookup('router:main'));
    this.set('popout', application.container.lookup('service:ember-popout'));
  },

  sendAction(...args) {
    this.send(`route:${this.get('router.currentRouteName')}`, ...args);
  },

  send(channel, ...args) {
    this.get('popout').trigger(channel, ...args);
  }
});
