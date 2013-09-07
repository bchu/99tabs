window.stop();

var Tab = function(tabId, title) {
  this.node = document.createElement('li');
  this.node.id = '_99tabs_tab_' + tabId;
  this.node.innerHTML = title;
};
Tab.prototype.remove = function()  {
  this.node.parentNode.removeChild(this.node);
  this.node = undefined;
};
Tab.prototype.updateTitle = function(title) {
  this.node.innerHTML = title;
};

var sidebar = document.createElement('ul');
sidebar.id = '_99tabs_menu';

var frame = document.createElement('iframe');
frame.id = '_99tabs_frame';
var frameUrl = chrome.extension.getURL('frame/frame.html');
console.log(frameUrl);
frame.src = frameUrl;

var title = document.querySelector('title').text;
document.documentElement.innerHTML = ''; // clear out html element
var titleEl = document.createElement('title');
titleEl.text = title;
document.head.appendChild(titleEl);

var body = document.body;
var bodyStyle = body.style;

body.appendChild(sidebar);
body.appendChild(frame);


// var templateStart = '<template id="_99tabs_menu_template">' +
//   '<style>' +
//   '.outer {}' +
//   '</style>';

// var templateEnd = '</div>'
//   '</template>';

// var body = document.body;
// body.appendChild()
// var shadow = document.querySelector('#_99tabs_menu').webkitCreateShadowRoot();
// var template = document.querySelector('#_99tabs_menu_template');
// shadow.appendChild(template.content);
// template.remove();

// handle % tage widths for html tags - update on browser resize (debounce it)

//height of top bar, or width in your case
// var sidebarWidth = parseFloat(getComputedStyle(el).width); //parseFloat - removes 'px'

// //resolve html tag, which is more dominant than <body>
// var html = document.documentElement;
// var originalHtmlWidth = getComputedStyle(html).width;
// var originalHtmlLeft = getComputedStyle(html).left;

// //position
// if (getComputedStyle(html).position === 'static') { //getComputedStyle(html).position
//   html.style.position = ('position', 'relative'); //use .style or setAttribute
// }

// var resizeLayout = function() {
//   //top (or right, left, or bottom) offset
//   // var currentLeft = getComputedStyle(html).left;
//   // var currentWidth = getComputedStyle(html).width;
//   var currentLeft = originalHtmlLeft;
//   var currentWidth = originalHtmlWidth;
//   if (currentLeft === 'auto') {
//     currentLeft = 0;
//   }
//   else {
//     currentLeft = parseFloat(currentLeft); //parseFloat removes any 'px' and returns a number type
//   }
//   currentWidth = parseFloat(currentWidth);
//   // 15 is for 
//   html.style.width = window.innerWidth - sidebarWidth - 15 + 'px'; //currentWidth - parseFloat(sidebarWidth) + 'px';
//   html.style.left = currentLeft + sidebarWidth + 'px';
// };
// resizeLayout();


// window.addEventListener('resize', function() {
//     resizeLayout();
// }, true);