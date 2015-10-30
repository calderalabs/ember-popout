import Ember from 'ember';
import PopoutRouteMixin from 'ember-popout/mixins/route';

export default Ember.Route.extend(PopoutRouteMixin, {
  actions: {
    alert(message) {
      window.alert(message);
    }
  }
});
