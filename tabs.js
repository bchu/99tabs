// Background script:
// http://developer.chrome.com/extensions/tabs.html#apiReference

// debug:
var bg = chrome.extension.getBackgroundPage();
console = bg.console;

var currentTab;
var tabs;
var connected = false;

var startup = function(port) {
  // initialization:
  chrome.tabs.query({}, function(tabsIn) {
    console.log(tabsIn);
    tabs = tabsIn;
    port.postMessage({action:'populate',body:tabs});
  });

  chrome.tabs.onCreated.addListener(function(tab) {
    if (!connected) {
      port = chrome.runtime.connect({name: "99tabs"});
    }
    // {
      port.postMessage({action:'add',body:tab});
    // }
  });
  chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    port.postMessage({action:'remove', body:tabId});
  });
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    port.postMessage({action:'update', body:tab});
  });
  // chrome.tabs.onMoved.addListener(function(tabId, moveInfo) {}); 
  // chrome.tabs.onActivated.addListener(function(activeInfo) {...}); 
  // chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {...}); 
};

var messageHandler = function(msg) {
  console.log('Received msg');
  console.log(msg);
  var action = msg.action;
  var body = msg.body;
  switch (action) {
    case 'remove':
      chrome.tabs.remove(body);
    break;
  }
};

chrome.runtime.onConnect.addListener(function(port) {
  connected = true;
  port.onDisconnect.addListener(function() {
    connected = false;
  });
  // if (!port) {
  //   port = chrome.runtime.connect({name: "99tabs"});
  // }
  // if (port.name !== '99tabs') {
  //   console.log('Wrong port');
  //   return;
  // }
  startup(port);
  port.onMessage.addListener(messageHandler);
});