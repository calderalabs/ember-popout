import Ember from 'ember';

const { inject, computed, on } = Ember;

export default Ember.Mixin.create({
  _popout: inject.service('ember-popout'),

  _popoutChannel: computed('routeName', function() {
    return `route:${this.get('routeName')}`;
  }),

  _initializePopout: on('activate', function() {
    this.get('_popout').on(this.get('_popoutChannel'), this, this.send);
  }),

  _teardownPopout: on('deactivate', function() {
    this.get('_popout').off(this.get('_popoutChannel'));
  })
});
