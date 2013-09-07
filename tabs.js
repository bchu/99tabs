// Background script:
// http://developer.chrome.com/extensions/tabs.html#apiReference


chrome.tabs.onCreated.addListener(function(Tab tab) {...}); 
chrome.tabs.onUpdated.addListener(function(integer tabId, object changeInfo, Tab tab) {...}); 
chrome.tabs.onMoved.addListener(function(integer tabId, object moveInfo) {...}); 
chrome.tabs.onActivated.addListener(function(object activeInfo) {...}); 
chrome.tabs.onRemoved.addListener(function(integer tabId, object removeInfo) {...}); 