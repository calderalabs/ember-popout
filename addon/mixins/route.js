import Ember from 'ember';

const { inject, computed, on } = Ember;

export default Ember.Mixin.create({
  popout: inject.service('ember-popout'),

  popoutChannel: computed('routeName', function() {
    return `route:${this.get('routeName')}`;
  }),

  initializePopout: on('activate', function() {
    this.get('popout').on(this.get('popoutChannel'), this, this.send);
  }),

  teardownPopout: on('deactivate', function() {
    this.get('popout').off(this.get('popoutChannel'));
  })
});
