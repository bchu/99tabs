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


  var Tab = function(tabId, idx, title, faviconUrl) {
    this.id = tabId;
    this.node = document.createElement('li');
    this.node.id = 't' + tabId;
    // if (/undefined$/g.test(faviconUrl)) {
    //   faviconUrl = '';
    // }
    var innerHtml = '<div class="favicon"><img src="' + faviconUrl + '"></div>' +
      '<div class="times">&times;</div>' +
      '<div class="title">' + title + '</div>';
    this.node.innerHTML = innerHtml;

    // insert tab element
    var before = menu.children[idx];
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
  Tab.prototype.remove = function()  {
    this.node.parentNode.removeChild(this.node);
    this.node = undefined;
    port.postMessage({action:'remove', id:this.id});
  };
  Tab.prototype.updateTitle = function(title) {
    this.node.text = title;
  };
  Tab.prototype.updateFavicon = function(url) {
    this.node.text = title;
  };


if (!chrome || !chrome.runtime) {
  // TEST DATA
  var test = [];
  for (var i = 0; i <15; i++) {
    var id = Math.floor(Math.random()*10000);
    var tab = new Tab(id, i, 'Tab numero  afsadjfkjasdlfjasdflkjaskldfjasljfasdflasd;fjasdlfj jalskdjfalsdj f' + i);
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
    switch(action) {
      case 'populate':
        for (var i = 0; i<msg.body.length; i++) {
          var tab = msg.body[i];
          new Tab(tab.id,tab.index,tab.title, tab.favIconUrl);
        }
      break;
    }
    // if (action === 'populate') {
    // }
    // else {

    // }
  });
}, true);
