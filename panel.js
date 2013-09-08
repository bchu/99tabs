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


  var Tab = function(tabId, idx, title) {
    this.node = document.createElement('li');
    this.node.id = 't' + tabId;
    var innerHtml = '<span class="favicon"></span>' + '<span class="times">&times;</span>' + title;
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
      activeTab.node.classList.remove('active');
      activeTab = self;
      self.node.classList.add('active');
    }, true);
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
  for (var i = 0; i < 30; i++) {
    var id = Math.floor(Math.random()*10000);
    var tab = new Tab(id, i, 'Tab numero ' + i);
    test.push(tab);
    if (i === 15) {
      tab.node.classList.add('active');
      activeTab = tab;
    }
  }
}, true);
