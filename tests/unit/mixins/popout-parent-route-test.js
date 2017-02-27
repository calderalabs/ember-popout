import Ember from 'ember';
import PopoutParentRouteMixin from 'ember-popout/mixins/popout-parent-route';
import { module, test } from 'qunit';

module('Unit | Mixin | popout parent route');

// Replace this with your real tests.
test('it works', function(assert) {
  let PopoutParentRouteObject = Ember.Object.extend(PopoutParentRouteMixin, {
    popoutParent: {
      listenToActions(arg) {
        assert.ok(arg);
      }
    }
  });
  PopoutParentRouteObject.create();
});
