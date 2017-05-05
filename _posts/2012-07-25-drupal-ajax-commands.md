---
layout: post
title: AJAX commands in Drupal 7
category: Development
tags:
 - Drupal 7
 - PHP
 - AJAX
 - JavaScript
---

One of the great 'new' features of Drupal 7 is the ability to use AJAX commands outside of FORM API allowing back-end and front-end developers to leverage high performance and solid JSON responses. JSON AJAX commands can be used simply and solidly in Drupal 7 to update blocks, nodes, pages and basically any element of a page with better performance on the client and server-side then loading AHAH page fragments.

In this tutorial we're going to create a simple and lightweight module that loads some content into a predefined page. Creating a module is pretty simple stuff but if you get lost, check out my [Super simple custom module](https://martsie.github.io/2012/06/29/drupal-super-simple-module/) tutorial.

--- 

### From the beginning: hook_menu and nojs
Start by creating a custom module and enabling it. Happy days. The next step is to go ahead and define three new menu paths in hook_menu which will be:

1. The page that has the link that runs the JavaScript (we'll call it the 'trigger' page).
1. The JSON response that sends the commands to the core drupal.ajax library that ends in /ajax.
1. The Non JavaScript fallback page that ends in /nojs.

It's very important to use /nojs and /ajax somewhere in your URL no matter what you're trying to achieve as Drupal's AJAX system will automatically replace 'nojs' with 'ajax' when your JavaScript loads.

{% gist daae1e971809656fe6b136753d112e65 %}

--- 

### The Callbacks

Right, so hook_menu tells Drupal which function names to call when each path is accessed using the 'callback' parameter but we still need to define those functions in our module so that Drupal has something to run. This is where the magic happens...

--- 

### The Callbacks: The trigger page

Lets start with the trigger page which as you remember is the page that will contain a solitary link to execute our marvelous AJAX commands. This function needs to do 3 things and they are ...

1. Tell Drupal to load in it's core AJAX libraries.
1. Tell Drupal to load in our custom JavaScript (which we'll get to later on this tutorial).
1. Present the user with a link that runs our AJAX commands and has the id my-special-link (important for later on ... trust me).

The best part is that each of those 3 things only takes one line of code to do (very exciting stuff).

{% gist 9b0ad580db32ec4915c6d0031600ecea %}

--- 

### The Callbacks: The AJAX response

This is where we get down and dirty, and this is the whole reason for this tutorials existence ... ready for it? AJAX Commands! AJAX Commands are so simple it hurts however their documentation (available at <http://api.drupal.org/api/drupal/includes%21ajax.inc/group/ajax_commands/7>) can be a bit daunting for a newbie. In this callback we only need to do 3 things (and you guessed it, each of them is only a single line of code).

1. Define an array to hold all our awesome AJAX commands in.
1. Add a new AJAX command to our array that inserts the text 'Hello world' after our link (using the id my-special-link (told you we'd need that).
1. Return our AJAX commands in (super fast) JSON.

{% gist cabf7f3940e61609dbbe12c3e3a41746 %}

--- 

### The Callbacks: The fallback

Undeniably the most boring, some may say most important, part of this tutorial is providing a fallback for users without JavaScript enabled in their browser (and some search engines). It's not even worth explaining this one.

{% gist 78f6ff1468482392a022e64fd8e062f9 %}

--- 

### The JavaScript (not too much I promise)

Because we've defined our AJAX commands in our callback and we're using the drupal.ajax core library the JavaScript is massively reduced (and sparkly clean too). As an extra special treat I've included event settings that makes the link respond to tap events on Android and IOS (without this you'd need a double tap to 'click' the link).

If you wanted to apply Drupal.ajax to more than one link on a page you're best bet would be to target the links using a jQuery $.each() loop however for the purposes of our quick and dirty demo, we're going to be targeting a single element using an ID.

#### Note

You can also bypass the need for custom JavaScript all together by using the class 'use-ajax' on your link (which Drupal will pick up automatically however this will remove the ability to customise your before/success callbacks and you won't get the 'tap' event on mobile devices.

{% gist ac005459403304a59e413d3ecfd06fb7 %}

--- 

### Further reading

Drupal 7's AJAX commands are practical, stable, clean and simple and I'd really like to see more developers leveraging them and creating some really cool AJAX driven Drupal sites. This tutorial is completely basic but I hope it's at least got you curious about exploring the documentation pages (<http://api.drupal.org/api/drupal/includes%21ajax.inc/group/ajax_commands/7>) and doing AJAX the 'Drupal way'.