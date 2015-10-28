# ember-popout

## How to use

- ember install ember-popout

```javascript
// components/ede-conversation.js
import Ember from 'ember';

export default Ember.Component.extend({
  popout: Ember.service.inject('ember-popout'),
  popup: null,
  
  actions: {
    popOut: function() {
      this.set('popup', this.get('popout').openPopup('conversations', this.get('conversation.id'));
    },
    
    sendMessage: function(message) {
      let parent = this.get('popout.parent');
      
      if (parent != null) {
        parent.sendAction('sendMessage', message);
      } else {
        let popup = this.get('popup');
        
        this.sendAction('sendMessage', message);
        
        if (popup != null) {
          popup.sendAction('reloadConversation', this.get('conversation'));
        }
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
    
    sendMessage: function(message) {
      message.saveRecord();
    }
  }
});
```
