#99tabs

I've got 99 problems and they're all Chrome tabs.

**Note: work on this project as stopped, as it appears to be technically unfeasible to implement tree-style tabs with the current state of the Chrome browser API.**

Approaches attempted:

1. Injecting a fixed position sidebar widget on every page. Html element is resized to accomodate this element. *Problem:* Other fixed position elements will interfere with the widget (and vice versa).
2. Replacing the entire page with both the sidebar widget and an iframe containing the website. *Problem:* certain websites block themselves from being contained in iframes (i.e: Facebook).
3. Replacing the entire page with both the sidebar widget and an iframe that contains a custom extension page. The extension transmits the html from the parent window into the iframe with the custom extension page. *Problem:* Parent JS execution cannot be stopped and will often crash. Many websites contain protocol-less URLs, which conflicts with the fact that the custom extension page has a protocol of `chrome-extension://`.

##Todo:

Data layer:  

1. Get all tabs upon Chrome init. Put them in an optimized data structure (model).
2. Store their titles.
3. Listen for add/remove events and update the model.

View layer:  

* Find way to style and position a sidebar.
* Create Shadow DOM and root element.
* Create template for each tab entry
* Create an x button for each tab and wire up to chome.tabs action
* Create hover effect on tabs.
* Create tab highlight effect
* Populate tabs on init with DocumentFragment
* Intelligently and optimally update DOM on tab changes
* Set up events for clicking x button and clicking tab. Have events * Directly alter the DOM to bypass message passing overhead.
* Add and style button at bottom to add a new tab/
* Create a setting for the side bar to be positoned on the right.
* Create right-click context menu that mimic's Chrome's menu (maybe somehow use their menu)
    * new tab
    * reload
    * duplicate 
    * pin tab
    * close tab
    * close all other tabs
    * close tabs to the right (under)
    * reopen closed tab
    * bookmark all tabs

Bonus:  

1. Handle detaching and swapping.
2. Animations for tab swapping.