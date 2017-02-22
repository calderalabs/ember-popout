import Ember from 'ember';
import PopoutParentRouteMixin  from 'ember-popout/mixins/popout-parent-route'

let _globalId = 1;

export default Ember.Route.extend(PopoutParentRouteMixin, {

  setupController(controller) {
    controller.set('popouts', Ember.A());
    Ember.defineProperty(controller, 'popoutsNotEmpty', Ember.computed('popouts.[]', function() {
      return !Ember.isEmpty(this.get('popouts'));
    }));
  },

  actions: {

    openPopout() {
      this.get('popoutParent').open(_globalId, 'popout');
      this.controller.get('popouts').pushObject(_globalId);
      _globalId++;
    },

    closePopout(id) {
      this.get('popoutParent').close(id);
      this.controller.get('popouts').removeObject(id);
    },

    closeAllPopouts() {
      this.get('popoutParent').closeAll();
      this.controller.set('popouts', Ember.A());
    },

    writeHello(...args) {
      console.log('Hello,', ...args);
    }
  }
});
