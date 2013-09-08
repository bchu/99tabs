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

  var Tab = function(tabId, idx, title) {
    this.node = document.createElement('li');
    this.node.id = 't' + tabId;
    this.node.innerHTML = title;

    var before = menu.children[idx];
    if (!before) {
      menu.appendChild(this.node);
    }
    else {
      menu.insertBefore(before, this.node);
    }
  };
  Tab.prototype.remove = function()  {
    this.node.parentNode.removeChild(this.node);
    this.node = undefined;
  };
  Tab.prototype.updateTitle = function(title) {
    this.node.text = title;
  };

  // TEST DATA
  var test = [];
  for (var i = 0; i < 20; i++) {
    var id = Math.floor(Math.random()*10000);
    test.push(new Tab(id, i, 'Tab numero' + i));
  }
}, true);
