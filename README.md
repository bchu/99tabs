#99tabs

I've got 99 problems and they're all Chrome tabs.

##Todo:

Data layer:  
1. Get all tabs upon Chrome init. Put them in an optimized data structure (model).
2. Store their titles.
3. Listen for add/remove events and update the model.

View layer:  
1. Find way to style and position a sidebar.
2. Create Shadow DOM and root element.
3. Create template for each tab entry
3. Create an x button for each tab and wire up to chome.tabs action
4. Create hover effect on tabs.
5. Create tab highlight effect
6. Populate tabs on init with DocumentFragment
7. Intelligently and optimally update DOM on tab changes
8. Set up events for clicking x button and clicking tab. Have events directly alter the DOM to bypass message passing overhead.
8. Add and style button at bottom to add a new tab/
9. Create a setting for the side bar to be positoned on the right.
10. Create right-click context menu that mimic's Chrome's menu (maybe somehow use their menu)
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