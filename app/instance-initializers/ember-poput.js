import Ember from 'ember';

export function initialize(application) {
  let event = new CustomEvent('ember-popout:initialize', {
    detail: { application }
  }, false);

  window.dispatchEvent(event);
}

export default {
  name: 'ember-popout',
  initialize: initialize
};
