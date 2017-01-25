---
layout: post
title: Database independent Views 3 custom field handlers
---

Views has so many convenient field handlers that almost all use cases can be covered using the standard set however there are times when you may need to display custom or specially formatted data in a view row without resorting to template hacking or views hooking.

--- 

### Avoid using 'Global: custom text' fields for dynamic content

![](/images/views-avoidcustomfields_0.jpg)

The most convincing use case of **'Global: Custom text' fields** to me is combining previously added fields together in a rewrite to be displayed as a single field (for example combing a first name and last name field) however too often custom fields are used for bad practice, messy and performance intensive view manipulation. Countless times I've seen custom text fields used as placeholders for dynamic content that would be later added using various pre_render / post_render / preprocess views hooks (I've been guilty of it) instead of developers implementing custom views field handlers. **So what's the alternative?** Well it turns out it's easy to create a lightweight, custom, fit for purpose views custom field handler that outputs virtually any content you want it to.

{% gist 7163da0a8e0e2cd84235971ed27ada53 %}

--- 

### Creating a custom views field handler

Views field handlers are defined using PHP classes that extend views_handler_field or a subclass of it. To create a views handler class:

1. Create a custom module (if you don't know how visit <http://interactivejunky.com/blog/super-simple-custom-module>).
1. Create a folder inside your custom module called *includes* and add a new file called views_handler_my_custom_field.inc .
1. Copy the code below into the file to create a basic skeleton for your handler.
1. In your modules .info file add the line `files[] = includes/views_handler_my_custom_field.inc`.

{% gist 0312f00be38ebc52d4fb6dc2391d6a84 %}

--- 

### Defining your custom view handler
In order for views to acknowledge the existence of your views handler you'll need to define it within a file called *my_custom_module.views.inc* in the root module directory.

{% gist 05171347b09e57ee47a72885fe5beacf %}

--- 

### Telling views about your module
Finally, for views to pick up your newly created include file, you'll have to invoke the Views API hook in your .module file. You can optionally specify folders within your module for views to look in if you wish, however if you're storing the my_custom_module.views.inc file within your root module folder you only need to include the following code.

{% gist 5ac13e4985eb2b3eb2f56c48052144b4 %}

--- 

### Add your custom field to a view
Before you continue, clear the Drupal cache so that the last two steps have been picked up by Views. Next visit the view you want to edit (or create a new one) and, when adding a field, your custom field should appear in the list. Simple!
