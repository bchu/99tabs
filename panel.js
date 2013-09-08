// debug:
// var bg = chrome.extension.getBackgroundPage();
// console = bg.console;

window.addEventListener('DOMContentLoaded', function() {
  $ = function(sel) {
    var self = this;
    if (self === window) {
      self = document;
    }
    if (sel[0] === '#') {
      return self.getElementById(sel.slice(1));
    }
    else {
      return self.querySelector(sel);
    }
  };

  var menu = $('.menu');
  menu.find = $;
  var activeTab;
  var tabs = {};

  var Tab = function(tab) {
    this.id = tab.id;
    tabs[this.id] = this;

    this.title = tab.title;
    this.index = tab.index;
    this.favicon = tab.favIconUrl;
    this.node = document.createElement('li');
    this.node.id = 't' + this.id;
    var innerHtml = '<div class="favicon"><img src="' + this.favicon + '"></div>' +
      '<div class="times">&times;</div>' +
      '<div class="title">' + this.title + '</div>';
    this.node.innerHTML = innerHtml;

    // insert tab element
    var before = menu.children[this.index];
    if (!before) {
      menu.appendChild(this.node);
    }
    else {
      menu.insertBefore(before, this.node);
    }

    // add click listener to tab, also handle x button
    var self = this;
    this.node.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('times')) {
        self.remove();
        if (activeTab === self) {
          // TODO: handle stepping back of tabs (Chrome move forwards)
        }
        return;
      }
      activeTab.node.classList.remove('active');
      activeTab = self;
      self.node.classList.add('active');
    }, true);
  };
  // silence - boolean that determines whether to silence post message (default false)
  Tab.prototype.remove = function(silence)  {
    silence = silence || false;
    if (!silence) {
      port.postMessage({action:'remove', body:this.id});
    }
    this.node.parentNode.removeChild(this.node);
    tabs[this.id] = undefined;
  };
  Tab.prototype.update= function(tab) {
    if (this.title !== tab.title) {
      this.title = tab.title;
    }
    if (this.favicon !== tab.favIconUrl) {

    }
  };

if (!chrome || !chrome.runtime) {
  // TEST DATA
  var test = [];
  for (var i = 0; i <15; i++) {
    var id = Math.floor(Math.random()*10000);
    var tab = new Tab({
      id:id,
      index:i,
      title:'Tab numero  afsadjfkjasdlfjasdflkjaskldfjasljfasdflasd;fjasdlfj jalskdjfalsdj f' + i
    });
    test.push(tab);
    if (i === 15) {
      tab.node.classList.add('active');
      activeTab = tab;
    }
  }
}

  //Created a port with background page for continous message communication
  var port = chrome.runtime.connect({name: "99tabs"});

  port.onMessage.addListener(function (msg) {
    var action = msg.action;
    var body = msg.body;
    switch(action) {
      case 'populate':
        for (var i = 0; i<msg.body.length; i++) {
          var tab = msg.body[i];
          new Tab(tab);
        }
      break;
      case 'add':
        // body is tab
        new Tab(body);
      break;
      case 'remove':
        //body is id
        tabs[body].remove(true);
      break;
    }

  });
}, true);
