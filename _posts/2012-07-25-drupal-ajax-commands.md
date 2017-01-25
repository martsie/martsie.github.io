---
layout: post
title: AJAX commands in Drupal 7
---

One of the great 'new' features of Drupal 7 is the ability to use AJAX commands outside of FORM API allowing back-end and front-end developers to leverage high performance and solid JSON responses. JSON AJAX commands can be used simply and solidly in Drupal 7 to update blocks, nodes, pages and basically any element of a page with better performance on the client and server-side then loading AHAH page fragments.

In this tutorial we're going to create a simple and lightweight module that loads some content into a predefined page. Creating a module is pretty simple stuff but if you get lost, check out my [Super simple custom module](http://interactivejunky.com/blog/super-simple-custom-module) tutorial.

### From the beginning: hook_menu and nojs
Start by creating a custom module and enabling it. Happy days. The next step is to go ahead and define three new menu paths in hook_menu which will be:

1. The page that has the link that runs the JavaScript (we'll call it the 'trigger' page).
1. The JSON response that sends the commands to the core drupal.ajax library that ends in /ajax.
1. The Non JavaScript fallback page that ends in /nojs.

It's very important to use /nojs and /ajax somewhere in your URL no matter what you're trying to achieve as Drupal's AJAX system will automatically replace 'nojs' with 'ajax' when your JavaScript loads.

{% gist daae1e971809656fe6b136753d112e65 %}

### The Callbacks
Right, so hook_menu tells Drupal which function names to call when each path is accessed using the 'callback' parameter but we still need to define those functions in our module so that Drupal has something to run. This is where the magic happens...

### The Callbacks: The trigger page

Lets start with the trigger page which as you remember is the page that will contain a solitary link to execute our marvelous AJAX commands. This function needs to do 3 things and they are ...

1. Tell Drupal to load in it's core AJAX libraries.
1. Tell Drupal to load in our custom JavaScript (which we'll get to later on this tutorial).
1. Present the user with a link that runs our AJAX commands and has the id my-special-link (important for later on ... trust me).

The best part is that each of those 3 things only takes one line of code to do (very exciting stuff).

{% gist 9b0ad580db32ec4915c6d0031600ecea %}

### The Callbacks: The AJAX response