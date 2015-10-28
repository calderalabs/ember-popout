# ember-popout

## How to use

- ember install ember-popout

```javascript
// components/ede-conversation.js
import Ember from 'ember';

export default Ember.Component.extend({
  popout: Ember.service.inject('ember-popout'),
  popoutWindow: null,
  
  actions: {
    popOut: function() {
      this.set('popoutWindow', this.get('popout').open('conversations', this.get('conversation.id'));
    },
    
    sendMessage: function(message) {
      let popoutWindow = this.get('popoutWindow');
      let parent = this.get('popout.parent');
      let conversation = this.get('conversation');
      
      if (parent != null) {
        parent.sendAction('sendMessage', message, conversation, popoutWindow);
      } else {
        this.sendAction('sendMessage', message, conversation, popoutWindow);
      }
    }
  }
}
```

```javascript
// routes/conversations.js
import Ember from 'ember';
import PopoutRouteMixin from 'ember-popout/mixins/route';

export default Ember.Route.extend(PopoutRouteMixin, {
  actions: {
    reloadConversation: function(conversation) {
      this.get('conversations').findBy('id', conversation.get('id')).reload();
    },
    
    sendMessage: function(message, conversation, popoutWindow) {
      message.saveRecord();
      
      if (popoutWindow != null) {
        popoutWindow.sendAction('reloadConversation', conversation);
      }
    }
  }
});
```
