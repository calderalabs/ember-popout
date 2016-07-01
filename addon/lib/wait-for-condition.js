import Ember from 'ember';

/**
 * @return {Promise}
 */
function timeout(ms) {
  return new Ember.RSVP.Promise(function(resolve) {
    Ember.run.later(null, resolve, ms);
  });
}

export default function waitForCondition(conditionFunction, pollInterval, maxWait) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    if (conditionFunction()) {
      resolve();
    } else if (maxWait <= 0) {
      reject();
    } else {
      timeout(pollInterval).then(function() {
        return waitForCondition(conditionFunction, pollInterval, maxWait - pollInterval);
      }).then(resolve).catch(reject);
    }
  });
}
