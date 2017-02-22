import Ember from 'ember';

export default Ember.Service.extend({

  windowMessengerClient: Ember.inject.service(),

  init(...args) {
    this._super(...args);
    let { location: { href, pathname } } = window;
    let parent = href.slice(0, href.search(pathname));
    this.get('windowMessengerClient').set('targetOriginMap', { parent });
  },

  sendAction(name, ...args) {
    this.get('windowMessengerClient').rpc('receiveAction', { name, args });
  }
});
