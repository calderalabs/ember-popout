# ember-postmessage

## How to use

- ember install ember-postmessage

```javascript
// components/ede-conversation.js
postmessage: Ember.service.inject('ember-postmessage'),
popup: null,

actions: {
  popOut: function() {
    this.set('popup', this.get('postmessage').openPopup('conversations', this.get('conversation.id'));
  },
  
  sendMessage: function(message) {
    message.saveRecord();
    this.get('popup').send('loadMessage', message.serialize());
  }
}
```

```javascript
// routes/conversations.js
actions: {
  loadMessage: function(message) {
    this.get('store').createRecord('message', message);
  }
}
```
