# ember-popout

[![Build Status](https://travis-ci.org/eugeniodepalo/ember-popout.svg?branch=master)](https://travis-ci.org/eugeniodepalo/ember-popout)
[![npm Version](https://img.shields.io/npm/v/ember-popout.svg?style=flat-square)](https://www.npmjs.org/package/ember-popout)
[![Ember Observer Score](http://emberobserver.com/badges/ember-popout.svg)](http://emberobserver.com/addons/ember-popout)

Simple popout window management.
One parent route can open several child popout routes.
Actions from the child popout routes can be propagated to the parent route.

## Installation

* `ember install ember-popout`

## Usage

### `app/router.js`

```js
import Ember from 'ember';
let Router = Ember.Router.extend();
Router.map(function() {
  this.route('parent');
  this.route('popout');
});
export default Router;
```

### `app/routes/parent.js`
```js
import PopoutParentRouteMixin  from 'ember-popout/mixins/popout-parent-route';
import Ember from 'ember';
export default Ember.Route.extend(PopoutParentRouteMixin, {
  actions: {
    openPopout() {
      // first argument is an id used later for popout manipulation
      // second argument is the path for the popout
      // option argument is stringified and passed on to `window.open`
      this.get('popoutParent').open(1, 'popout', {
        left: _globalId * 10,
        top: _globalId * 10,
        width: 300,
        height: 300,
        scrollbars: 0,
        resizable: 0,
      });
    },
    writeHello(name) {
      console.log('hello, ' + name);
    }
  }
});
```

### `app/templates/parent.hbs`
```hbs
<button {{action "openPopout"}}>Open Popout</button>
```

### `app/routes/popout.js`
```js
import PopoutChildRouteMixin  from 'ember-popout/mixins/popout-child-route';
let ParentRoute = Ember.Route.extend(PopoutChildRouteMixin, {
  parentActions: ['writeHello']
});
```

### `app/templates/popout.hbs`
```hbs
<button {{action "writeHello" "friend"}}>Print to console in parent window</button>
```

Clicking the button will print "hello, friend" to the parent window's console.
