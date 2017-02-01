---
layout: post
title: Changing the page title with AJAX Commands in Drupal
tags:
 - Drupal 7
 - AJAX
 - PHP
 - JavaScript
---

So you've loaded that new AJAX fragment using AJAX commands but you want to change the page title too?

--- 

### The JavaScript
Create a new JavaScript plugin called `jquery.changePageTitle.js` and add it to the same pages your AJAX will be running in. Inside the JavaScript add...

{% gist f18a2fa307729cb7fc7b9b6814c7e030 %}

--- 

### The PHP
Alongside your other AJAX Commands in your Drupal module AJAX callback add the code below replacing 'My great page title' with any string or PHP string variable you want.

{% gist 4070671e9b111ce334bd3eb549ac5aac %}

--- 

### Bonus
A good suggestion to improve consistency is to format the title including the site name in the same way Drupal does it by default.

{% gist c9884ffbcdbebdfb5d47091e531d2b49 %}