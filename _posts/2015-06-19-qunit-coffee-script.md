---
layout: post
title: Using Backbone.js with CoffeeScript
---

During an interview process recently I was asked to create a CoffeeScript powered AJAX widget for displaying external content. Having never used CoffeeScript before I decided to go about learning it in a completely test driven way instead of the standard of the usual “hack a few things together and recover” way I’ve done in the past.

### What is QUnit?
There's a whole set of JavaScript testing frameworks out there, [QUnit](https://qunitjs.com/) is one of the classics. Developed in 2008 as part of jQuery by John Resig it's since been redeveloped as a standalone and pretty simple to use library.

### Unit testing a CoffeeScript class method
Here’s a super basic example of a CoffeeScript class...

{% gist 2c799761f82e06f075785ed7e4a2c795 %}

### Some features of this class
-   **The Class is in global scope** which you can see using the @ symbol at the beginning of the class name. If you don't do this your test will not be able to access the class you're testing if you compile them into different JavaScript files (which you should do). There are a few ways around this including having a Public app scope or compiling your app into your tests however this is the simple example and it's not entirely 'wrong' just simple.
-   The first and last names have default values
-   The constructor overrides the first and last name automatically
-   The full name prints a concatenated version of the first and last name

Moving on to the test, in a separate CoffeeScript file use...

{% gist 6df597dcb175d1d134c124ebfda0ae1b %}

### Let's deconstruct this test
-   First we define the QUnit module. This groups tests together, especially useful when you're testing multiple classes in a larger project.
-   Line 3 has the printed name of the test as it will appear in the list, and it will be called with no arguments in this example.
-   Line 4 instantiates the class, overloading the first and last name variables.
-   The last line asserts that the fullName method outputs the full name in the proper format.

### Asyncronous assertions
It's difficult to get very far in a JavaScript application without encountering an Asynchronous method, thankfully with QUnit it's very easy to test those as well.

Here's a very simple example of a class with an asynchronous method...

{% gist 5738fb2e618d9023b255bef9cec0d218 %}

This class has a single method which has a single argument 'success' which is called after a 1 second timeout. However if you attempt to test this class using the standard assertions in the previous QUnit you will get an immediate fail so the test must be adapted to be:

{% gist 78bbccf2c191db7623b259dc856a5082 %}

Breaking apart this test...

-   Once again the first line once again defines the module
-   Line 3 defines the test name but now includes an additional argument 'assert' which is a QUnit variable we'll make use of in the test class.
-   Line 4 defines a new Asynchronous operation and assigns it to a variable called done. This tells QUnit that it will need to run this test asynchronously and wait until the done method is executed or 30 seconds (by default) has elapsed.
-   Line 6 creates the Waiter class with no arguments
-   Line 8 executes the method and immediately defines a callback function which, when triggered by the timeout, will create a pass assertion and tell QUnit it has finished.

### What about multiple Async assertions?
Depending on which school of thought you subscribe to, you may or may not believe multiple assertions in a test are a sign of bad code. Regardless of what you believe here's how to do multiple Asynchronous assertions...

{% gist 7a7893dd93700932a818e80fcdd6f0ba %}

This test is very similar to the previous test except that in this case there are now two async operations defined. To tell QUnit that there are multiple assertions that must be completed, use the assert.expect method and define how many assertions should be called.
