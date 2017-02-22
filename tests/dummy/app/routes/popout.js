import Ember from 'ember';
import PopoutChildRouteMixin  from 'ember-popout/mixins/popout-child-route'

export default Ember.Route.extend(PopoutChildRouteMixin, {

  parentActions: [
    'writeHello'
  ],

  actions: {
    writeGoodbye(fromWho) {
      this.get('popoutChild').sendAction('writeHello', fromWho, 'and good bye');
    }
  }
});
