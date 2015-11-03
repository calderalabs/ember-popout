export function initialize(application) {
  application.lookup('service:ember-popout').set('_self', application);
  let event = new CustomEvent('ember-popout:initialize', {
    detail: { application }
  }, false);

  window.dispatchEvent(event);
}

export default {
  name: 'ember-popout',
  initialize: initialize
};
