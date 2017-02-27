import Ember from 'ember';
import PopoutChildRouteMixin from 'ember-popout/mixins/popout-child-route';
import { module, test } from 'qunit';

module('Unit | Mixin | popout child route');

// Replace this with your real tests.
test('it needs the field parentActions to be defined', function(assert) {
  let PopoutChildRouteObject = Ember.Object.extend(PopoutChildRouteMixin);
  assert.throws(function() {
    PopoutChildRouteObject.create({});
  });
});


test('it exists', function(assert) {
  let PopoutChildRouteObject = Ember.Object.extend(PopoutChildRouteMixin);
  let subject = PopoutChildRouteObject.create({
    parentActions: []
  });
  assert.ok(subject);
});
