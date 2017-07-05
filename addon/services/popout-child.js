import Ember from 'ember';
import locationOrigin from 'ember-popout/utils/location-origin';

export default Ember.Service.extend({

  windowMessengerClient: Ember.inject.service(),

  init(...args) {
    this._super(...args);
    let parent = locationOrigin();
    this.get('windowMessengerClient').set('targetOriginMap', { parent });
  },

  sendAction(name, ...args) {
    this.get('windowMessengerClient').rpc('receiveAction', { name, args });
  }
});
