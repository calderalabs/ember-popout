import Ember from 'ember';

const { inject } = Ember;

export default Ember.Controller.extend({
  _popout: inject.service('ember-popout'),
  popout: null,

  actions: {
    popout() {
      this.set('popout', this.get('_popout').open('alerts'));
    },

    close() {
      this.get('popout').close();
    },

    sendAlert() {
      this.get('popout').sendAction('alert', 'Hey there!');
    }
  }
});
