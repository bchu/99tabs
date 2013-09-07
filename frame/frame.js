if (window.tabs99) {
  return;
}
window.tabs99 = {
  messageHandler: function(evt) {
    var script = document.createElement('script');
    script.src = 'frame.js';
    console.log('Message received!');
    try {
      var data = JSON.parse(evt.data);
    } catch (e) {}
    if (data.header === 'html') {
      console.log('hi')
      document.documentElement.innerHTML = data.body;
      document.head.appendChild(script);
    }
  }
};
window.addEventListener("message", window.tabs99.messageHandler, true);