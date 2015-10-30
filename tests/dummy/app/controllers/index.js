import Ember from 'ember';

const { inject } = Ember;

export default Ember.Controller.extend({
  popout: inject.service('ember-popout'),

  actions: {
    popout() {
      this.get('popout').open('alerts').then((receiver) => {
        this.set('receiver', receiver);
      });
    },

    sendAlert() {
      this.get('receiver').sendAction('alert', 'Hey there!');
    }
  }
});
