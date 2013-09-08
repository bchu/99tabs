// Background script:
// http://developer.chrome.com/extensions/tabs.html#apiReference

// debug:
var bg = chrome.extension.getBackgroundPage();
console = bg.console;

var currentTab;
var tabs;
var ports = {};
var notifyDevtools = function(msg) {
  for (var id in ports) {
    if (ports.hasOwnProperty(id)) {
      ports[id].postMessage(msg);
    }
  }
};

chrome.tabs.onCreated.addListener(function(tab) {
  notifyDevtools({action:'add',body:tab});
});
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  notifyDevtools({action:'remove', body:tabId});
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('update:',tab);
  notifyDevtools({action:'update', body:tab});
});
chrome.tabs.onReplaced.addListener(function(addId, removeId) {
  console.log('replace:',addId,' ',removeId);
  notifyDevtools({action:'replace',body:{addId:addId,removeId:removeId}});
});
// chrome.tabs.onMoved.addListener(function(tabId, moveInfo) {}); 
chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log('activated:',activeInfo);
  notifyDevtools({action:'activate',body:activeInfo.tabId});
});
chrome.tabs.onHighlighted.addListener(function(highlightInfo) {
  // console.log('highlighted:',highlightInfo);
});

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
  ports[port.portId_] = port;
  port.onDisconnect.addListener(function(port) {
    delete ports[port.portId_];
  });
  // if (!port) {
  //   port = chrome.runtime.connect({name: "99tabs"});
  // }
  // if (port.name !== '99tabs') {
  //   console.log('Wrong port');
  //   return;
  // }
  port.onMessage.addListener(messageHandler);
  // only done once per port
  chrome.tabs.query({}, function(tabsIn) {
    tabs = tabsIn;
    port.postMessage({action:'populate',body:tabs});
  });
});
