// Background script:
// http://developer.chrome.com/extensions/tabs.html#apiReference

// debug:
var bg = chrome.extension.getBackgroundPage();
console = bg.console;
console.log('hi');

var currentTab;
var tabs;

var startup = function(port) {
console.log('hi');
  // Startup
  chrome.tabs.query({}, function(tabsIn) {
    console.log(tabsIn);
    tabs = tabsIn;
    port.postMessage({action:'populate',body:tabs});
  });

  chrome.tabs.onCreated.addListener(function(tab) {
    tabs.splice(tab.index,0,tab);
  });
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    var idx = tab.index;
    tab[idx] = tab;
  });
  // chrome.tabs.onMoved.addListener(function(tabId, moveInfo) {}); 
  // chrome.tabs.onActivated.addListener(function(activeInfo) {...}); 
  // chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {...}); 
};

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name !== '99tabs') {
    return;
  }
  startup(port);
  port.onMessage.addListener(function(msg) {
    console.log(msg);
    var action = msg.action;
    switch (action) {
      case 'remove':
        debugger;
        chrome.tabs.remove(msg.id);
      break;
    }
  });
});