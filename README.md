#99tabs

I've got 99 problems and they're all Chrome tabs.

**Note: this project requires use of the dev tools panel. This requires opening the panel manually on every open tab. No other approach seems feasible.**

Failed approaches attempted:

1. Injecting a fixed position sidebar widget on every page. Html element is resized to accomodate this element. *Problem:* Other fixed position elements will interfere with the widget (and vice versa).
2. Replacing the entire page with both the sidebar widget and an iframe containing the website. *Problem:* certain websites block themselves from being contained in iframes (i.e: Facebook).
3. Replacing the entire page with both the sidebar widget and an iframe that contains a custom extension page. The extension transmits the html from the parent window into the iframe with the custom extension page. *Problem:* Parent JS execution cannot be stopped and will often crash. Many websites contain protocol-less URLs, which conflicts with the fact that the custom extension page has a protocol of `chrome-extension://`.

##Todo:

View layer:  

* Programmatic opening of panel
* Add and style button at bottom to add a new tab
* handle drag and drop (detach and swap)
* handle move events
* filter based on windows
* handle multiple tab select
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
