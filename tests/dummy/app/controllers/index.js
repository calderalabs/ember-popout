import Ember from 'ember';

const { inject } = Ember;

export default Ember.Controller.extend({
  popout: inject.service('ember-popout'),

  actions: {
    popout() {
      this.get('popout').open('alerts').then((receiver) => {
        this.set('receiver', receiver);

        receiver.on('close', () => {
          this.set('receiver', null);
        });
      });
    },

    close() {
      this.get('receiver').close();
    },

    sendAlert() {
      this.get('receiver').sendAction('alert', 'Hey there!');
    }
  }
});
