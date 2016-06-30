import Ember from 'ember';
import generateCustomEvent from 'ember-popout/lib/generate-custom-event';

const {
  RSVP: {
    Promise
  },
  run: {
    cancel,
    later
  },
  set
} = Ember;

export function initialize(application) {
  let service;
  if (application.lookup) {
    service = application.lookup('service:ember-popout')
  } else {
    service = application.container.lookup('service:ember-popout')
  }
  set(service, '_self', application);
  let initialized = false;
  set(service, '_parent', new Promise(function(resolve, reject) {
    let timer = later(null, reject, 2000);
    // parent needs to send an event first
    window.addEventListener('ember-popout:init-from-parent', (evt) => {
      cancel(timer);
      resolve(evt.detail.service);
      // since parent can be sending more than one event,
      // we send an acknowledgement only once
      if (!initialized) {
        initialized = true;
        let event = generateCustomEvent('ember-popout:initialize', { application });
        // send an acknowledgement event to the parent
        window.dispatchEvent(event);
      }
    });
  }));
}

export default {
  name: 'ember-popout',
  initialize: initialize
};
