import Ember from 'ember';
import generateUuid from 'ember-popout/lib/generate-uuid';
import stringifyOptions from 'ember-popout/lib/stringify-options';

const { run, merge, computed, RSVP } = Ember;

/**
 * @module models
 */

/**
 * Represents the context of a popout window. This lives in the parent window.
 * The `ember-popout` instance initializer of the popout window fires an event
 * which an instance of `Context` listens to to initialize its properties to
 * properly point to objects in the popout window. Calling `send` on a context
 * triggers an event on the popout window's EmberPopout service. If a route
 * in the popout window uses the EmberPopoutRoute mixin, it will translate
 * such events into actions on the route.
 *
 * @class Context
 */
export default Ember.Object.extend({

  mergedProperties: ['options'],

  /**
   * A reference to the `window` object of an opened popout window.
   * @property _reference
   * @private
   */
  _reference: null,

  /**
   * A reference to the application instance in the popout window.
   * @property _application
   * @private
   */
  _application: null,

  /**
   * A reference to the router of the application instance in the popout window.
   * @property _router
   * @private
   */
  _router: null,

  /**
   * A reference to the ember-popout service of the application instance in the
   * popout window.
   * @property _popout
   * @private
   */
  _popout: null,

  /**
   * @property isOpen
   * @type Boolean
   */
  isOpen: false,

  /**
   * The URL that will be used to open the popout window.
   * @property url
   * @type String
   * @default window.location.origin the top most
   */
  url: window.location.origin,

  id: computed(function() {
    return generateUuid();
  }),

  options: {
    width: 500,
    height: 500
  },

  _initializeLookups() {
    // this is the container of the application instance in the poopout window
    let container = this.get('_application.container');
    this.set('_router', container.lookup('router:main'));
    this.set('_popout', container.lookup('service:ember-popout'));
  },

  open() {
    let options = this.get('options');
    let reference;

    let mergedOptions = merge({
      left: ((screen.width / 2) - (options.width / 2)),
      top: ((screen.height / 2) - (options.height / 2)),
    }, options);

    reference = window.open(
      this.get('url'),
      this.get('id'),
      stringifyOptions(mergedOptions)
    );

    this.set('_reference', reference);

    return new RSVP.Promise((resolve) => {
      reference.addEventListener('ember-popout:initialize', (event) => {
        run(this, function() {
          this.set('_application', event.detail.application);
          this._initializeLookups();
          this.set('isOpen', true);
          resolve();
        });
      });

      reference.addEventListener('unload', () => {
        this.set('isOpen', false);
      });
    });
  },

  close() {
    let reference = this.get('_reference');

    if (reference != null) {
      reference.close();
    }
  },

  sendAction(...args) {
    this.send(`route:${this.get('_router.currentRouteName')}`, ...args);
  },

  send(channel, ...args) {
    let popout = this.get('_popout');

    if (popout != null) {
      this.get('_popout').trigger(channel, ...args);
    }
  }
});
