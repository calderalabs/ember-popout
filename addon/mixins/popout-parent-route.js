import Ember from 'ember';

export default Ember.Mixin.create({

  popoutParent: Ember.inject.service(),

  init(...args) {
    this._super(...args);
    this.get('popoutParent').listenToActions(this);
  }
});
