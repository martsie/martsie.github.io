---
layout: post
title: Real world JavaScript performance of large element lists
category: Development
tags:
 - JavaScript
 - Performance
---

At [Rome2rio](https://www.rome2rio.com) we're working on improving the front-end performance of our large booking ticket lists which present upwards of 150 combinations to users. When considering front-end performance we consider both the DOM speed as well as the Javascript execution time.

--- 

### The test
The structure of the test I wrote on JsFiddle is simple. It creates DOM nodes using native JavaScript document.createElement with 15 children (each containing an image and some text) and appends them to screen to be shown to the user - exactly how a list of results would be displayed to an end user. The test uses requestAnimationFrame to gradually scroll the page 10,000 pixels down to simulate user action.

--- 

### Javascript execution time results
Javascript execution time was captured using performance.now() at different points during the execution process before the simulated scroll event. This is set-up time in which the computer will be locked up and the user will not be able to interact with the product (we try to minimize this as much as possible).

* **Sequential** adding refers to building all elements in the test, then adding them afterwards all at once. For example if there is a json data source with 1000 elements, first create 1000 html elements and then append all 1000 to the DOM. Once there were over 100 elements this turned out to be the least efficient method.
* **On-Demand** adding refers to build all elements in the test (as in sequential) however only adding them to the dom when the user is about to approach the scroll position in which there is a blank space, only appending them when necessary. This was most efficient at 500 child nodes.
* **Build-on-append** extends the on-demand method by building an element only when it's ready to be appended. Initially 5 elements still need to be appended to the screen to fill it which accounts for the boot-up time shown in the graph.
* **Bundled build-on-append** extends build-on-append by creating and appending in groups of 5 instead of appending child 1 time for each element added. It doesn't really influence performance much as an extension of build-on-append as the method has already reached it's peak efficiency by only adding elements to the dom when the user is about to scroll to them.

![Creating and appending large lists](/images/complex-lists-graph.png)

--- 

### Browser performance results
Looking at the recorded performance graphs makes the differences pretty obvious. The red bars are javascript execution time that's locking up the browser and the green bars is time spent painting. What's not so obvious is the frames per second graph underneath that doesn't show that if any interaction was taking place on the page during javascript execution time or paint time then the browser would be locked up during that time and the FPS would reduce to virtually 0.

Build-on-append manages to spread the build and append operations across the entire user operation. The disadvantage comes in the form of some lost frames during the scrolling process but gives the user instant access to the results.

![Creating and appending large lists](/images/complex-lists-browser-perf.png)

--- 

### Conclusion
Although appending to the dom is expensive, preparing dom elements in memory is as expensive. By far the best option as the user's computer will only ever do as much computing power as is necessary to display the results however it comes at the cost of possibly reducing frame-rate during the scroll operation.
