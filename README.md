#99tabs

I've got 99 problems and they're all Chrome tabs.

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