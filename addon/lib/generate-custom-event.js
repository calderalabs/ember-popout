/**
 * @param {String} name the name of the event
 * @param {Object} details any details to send with the event
 * @param {Window} w the window in whose context the event will be created
 */
export default function generateCustomEvent(name, details, w = window) {
  let event = w.document.createEvent('CustomEvent');
  event.initCustomEvent(name, false, false, details);
  return event;
}
