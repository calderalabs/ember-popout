import Ember from 'ember';
import PopoutParentRouteMixin  from 'ember-popout/mixins/popout-parent-route';

let _globalId = 1;

export default Ember.Route.extend(PopoutParentRouteMixin, {

  setupController(controller) {
    Ember.defineProperty(controller, 'popouts', Ember.computed.readOnly('popoutParent.popoutNames'));
    Ember.defineProperty(controller, 'popoutsNotEmpty', Ember.computed.notEmpty('popouts'));
  },

  actions: {

    openPopout() {
      this.get('popoutParent').open(_globalId, 'popout', {
        left: _globalId * 10,
        top: _globalId * 10,
        width: 300,
        height: 300,
        scrollbars: 0,
        resizable: 0,
      });
      _globalId++;
    },

    closePopout(id) {
      this.get('popoutParent').close(id);
    },

    closeAllPopouts() {
      this.get('popoutParent').closeAll();
    },

    writeHello(...args) {
      console.log('Hello,', ...args);
    }
  }
});
