import Ember from 'ember';

export default Ember.Mixin.create({

  popoutChild: Ember.inject.service(),

  parentActions: undefined,

  init(...args) {
    this._super(...args);
    if (Ember.typeOf(this.get('actions')) !== 'object') {
      this.set('actions', {});
    }
    this.get('parentActions').forEach((action) => {
      this.actions[action] = function(...args) {
        this.get('popoutChild').sendAction(action, ...args);
      };
    });
  }
});
