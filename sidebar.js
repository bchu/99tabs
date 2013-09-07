// Content script:

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

var el = document.createElement('ul');
el.id = '_99tabs_menu';

var body = document.body;
body.insertBefore(el,body.firstChild);


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



//height of top bar, or width in your case
var sidebarWidth = getComputedStyle(el).width;

//resolve html tag, which is more dominant than <body>
var html = document.documentElement;

//position
if (getComputedStyle(html).position === 'static') { //getComputedStyle(html).position
  html.style.position = ('position', 'relative'); //use .style or setAttribute
}

//top (or right, left, or bottom) offset
var currentLeft = getComputedStyle(html).left;
if (currentLeft === 'auto') {
  currentLeft = 0;
}
else {
  currentLeft = parseFloat(left); //parseFloat removes any 'px' and returns a number type
}
html.style.left = currentLeft + parseFloat(sidebarWidth) + 'px';