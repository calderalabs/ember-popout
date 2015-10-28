import Ember from 'ember';

const { on, observer, run } = Ember;

export default Ember.Object.extend({
  reference: null,
  application: null,
  router: null,

  initializeWindow: on('init', observer('reference', function() {
    let reference = this.get('reference');

    if (reference != null) {
      reference.addEventListener('ember-popout:initialize', (event) => {
        run(this, function() {
          this.set('application', event.detail.application);
        });
      });
    }
  })),

  initializeLookups: on('init', observer('application', function() {
    let application = this.get('application');

    if (application != null) {
      this.set('router', application.container.lookup('router:main'));
    }
  })),

  sendAction(...args) {
    this.send(this.get('router.currentRouteName'), ...args);
  },

  send(channel, ...args) {
    console.log(...args);
    alert(channel);
  }
});
