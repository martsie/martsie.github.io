---
layout: post
title: Theme override functions - beautify breadcrumbs, lists and form elements in Drupal 7
---

Drupal offers developers highly flexible methods of modifying and overriding system functions and the theming layer is no exception. Drupal theming isn't just an exercise in CSS and HTML ... oh no ... it can also be an exercise in, you guessed it, PHP.

### First things first: the template.php file
Before we start we need to know where our code will be going. Theme overrides should be placed in the template.php file in the root folder of your active theme so if you don't already have a template.php file create one. Sometimes, in order to manage large amounts of theme overrides, developers use includes to load in theme overrides to template.php though it's not necessary for the purposes of this tutorial. Make sure your template.php file begins with <?php.

### Example 1: Overriding the Drupal breadcrumb
So you want to use images instead of '»' arrows in your breadcrumb list? Or maybe you want the wrapper surrounding your breadcrumbs to have a different class? The wrong way to go about this would be to use a jQuery hack or a CSS class (and I've seen lots of people do this). The other thing I've seen a lot of developers do is go back to their designer or project manager and say "sorry can't be done in Drupal" which gives Drupal a bad name and makes baby Dries cry (Drupal reference there ... Dries is like our Jesus for those that don't know). The cleanest way of making the changes you need is:

1. Find the breadcrumb theming function in the Drupal documentation by going to [http://api.drupal.org/api/drupal/modules%21system%21theme.api.php/group/...](http://api.drupal.org/api/drupal/modules%21system%21theme.api.php/group/themeable/7) and searching the page for 'breadcrumb'.
1. Click on theme_breadcrumb (taking you to [http://api.drupal.org/api/drupal/includes%21theme.inc/function/theme_bre...](http://api.drupal.org/api/drupal/includes%21theme.inc/function/theme_breadcrumb/7)) and paste all the code from the 'Code' section into the bottom of your template.php file.
1. Change the 'theme_' bit of the function name to the name of your theme. For example if my theme was called my_awesome_theme my function would like like function my_awesome_theme_breadcrumb($variables) { ...
1. Clear the cache and make whatever changes you need to inside the function.

This is the same process in Drupal 6 and Drupal 7 however Drupal 7 theme functions generally only accept one argument, an array of renderable elements, whereas Drupal 6 theme functions are a bit chaotic and can accept a variety of different arguments.

Sometimes the changes you make may require trudging through the variables passed through to the theme function however once you get the hang of it, outputting Drupal markup in the way you want it becomes simple. Here's an example ...

{% gist c3212ad7fda42f7fdd369bbfb7ec50fa %}

Of course if you get really adventurous you can go as far as reformatting your breadcrumbs as an unordered list or even a select list. If for some reason your designer wanted to use images uploaded into the nodes or taxonomy terms in the breadcrumb trail you could load the images in from the entities in to the breadcrumb trail. All without hacks just clean Drupal code.

### Example 2: Messing with lists
In this example we're going to override the theme function for lists in order to add a span inside every list element on our Drupal site. It's pretty common for designs to require extra markup in order to work with older or poorer browsers (*cough* Internet Explorer *cough*) and using spans is a good way of avoiding complex poly-fills to get your site looking the way it should in those browsers.

{% gist 04e5a9983305fa0aba54ebb9b00b71e7 %}

### Example 3: Fancy textfields
So your designer has decided that all the textfields on your Drupal site need to have rounded corners and your client has decided that all your textfields will need to maintain those rounded corners in Internet Explorer 6, 7 and 8 regardless of whether the user has JavaScript enabled or disabled. Even if you could use CSS3 PIE as a polyfill on forms with large amounts of fields the performance would be seriously impaired and painful for your users ageing CPU's. Why not wrap every textfield in a couple of divs and use some graphics supplied by your (asshole) designer? That's exactly what we're going to do.

Instead of copying all the code from [http://api.drupal.org/api/drupal/includes%21form.inc/function/theme_text...](http://api.drupal.org/api/drupal/includes%21form.inc/function/theme_textfield/7) into our template.php file and renaming the function we're going to use a slightly different, cleaner and simpler approach.

1. In your template.php create a new function called YOUR_THEME_NAME_textfield that has a single argument called '&$variables'. Our theme will be called my_awesome_theme for the purposes of this tutorial.
```
<?php
function my_awesome_theme_textfield(&$variables) {
  // My awesome theme code here.
}
```
1. Instead of building a textfield from scratch, lets return the code that Drupal already provides using the variables Drupal is passing to us ...
```
<?php
function my_awesome_theme_textfield(&$variables) {
  $output = theme_textfield($variables);
  return $output;
}
```
1. Now lets enclose the output returned by our function with some spans...
```
<?php
function my_awesome_theme_textfield(&$variables) {
  $output = '<span class="my-awesome-textfield-wrapper"><span class="textfield-wrapper-inner">';
  $output .= theme_textfield($variables);
  $output .= '</span></span>';
  return $output;
}
```
1. Clear your cache and voila, all textfields on your Drupal site will now be surrounded by two spans, one with the class 'my-aewsome-textfield-wrapper' and the other with the class 'textfield-wrapper-inner'.

Whenever you're simply creating wrapper divs for Drupal elements this method allows you to keep your code clean whilst getting in the extra markup you need.

### A word of warning (be careful about reducing or replacing markup)
Before you get too excited there's some things that you should know ... yes most themers agree that Drupal outputs some pretty nasty and convoluted markup but reducing the markup using theme overrides is risky business if you're relying on community and core JavaScript to power your site. In fact I'd go as far as to say that reducing markup or re-labelling classes is against Drupal coding standards but in the end it's up to you and demands of your project. Also, if you can use preprocess and process functions to make the changes you need reliably and cleanly then use them instead.

Happy theming!