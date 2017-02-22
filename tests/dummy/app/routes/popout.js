import Ember from 'ember';

export default Ember.Route.extend({
  popoutChild: Ember.inject.service(),

  actions: {
    writeHello() {
      this.get('popoutChild').sendAction('writeHello', 'from me');
    }
  }
});
