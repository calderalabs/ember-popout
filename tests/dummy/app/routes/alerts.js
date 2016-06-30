import Ember from 'ember';
import PopoutRouteMixin from 'ember-popout/mixins/route';

const {
  Route,
  get
} = Ember;

export default Route.extend(PopoutRouteMixin, {

  beforeModel() {
    return get(this, '_popout._parent'); // wait for parent;
  },

  actions: {
    alert(message) {
      window.alert(message);
    }
  }
});
