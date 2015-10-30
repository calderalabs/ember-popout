import Ember from 'ember';
import generateUuid from 'ember-popout/lib/generate-uuid';
import stringifyOptions from 'ember-popout/lib/stringify-options';

const { on, observer, run, merge, computed, RSVP } = Ember;

export default Ember.Object.extend({
  mergedProperties: ['options'],
  reference: null,
  application: null,
  router: null,
  popout: null,

  id: computed(function() {
    return generateUuid();
  }),

  options: {
    width: 500,
    height: 500
  },

  initializeLookups: on('init', observer('application', function() {
    let application = this.get('application');

    if (application != null) {
      this.set('router', application.container.lookup('router:main'));
      this.set('popout', application.container.lookup('service:ember-popout'));
    }
  })),

  open() {
    let options = this.get('options');
    let reference;

    let mergedOptions = merge({
      left: ((screen.width / 2) - (options.width / 2)),
      top: ((screen.height / 2) - (options.height / 2)),
    }, options);

    reference = window.open(
      window.location.origin,
      this.get('id'),
      stringifyOptions(mergedOptions)
    );

    return new RSVP.Promise((resolve, _) => {
      reference.addEventListener('ember-popout:initialize', (event) => {
        run(this, function() {
          this.set('application', event.detail.application);
          run.next(resolve);
        });
      });
    });
  },

  transitionTo(...args) {
    this.get('router').transitionTo(...args);
  },

  sendAction(...args) {
    this.send(`route:${this.get('router.currentRouteName')}`, ...args);
  },

  send(channel, ...args) {
    this.get('popout').trigger(channel, ...args);
  }
});
