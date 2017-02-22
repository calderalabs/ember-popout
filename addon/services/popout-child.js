import Ember from 'ember';

export default Ember.Service.extend({

  windowMessengerClient: Ember.inject.service(),

  sendAction(name, ...args) {
    this.get('windowMessengerClient').rpc('receiveAction', { name, args });
  }
});
