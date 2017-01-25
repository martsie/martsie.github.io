---
layout: post
title: Give all user permissions to the admin role in Drupal
---

I've seen, especially on older Drupal 7 websites, situations in which the default admin role has either not been set or the role has had to be changed. Changing the admin role in Drupal however doesn't automatically give the role all the permissions on the site - to do that you'll need to either use a macro to tick all the boxes on the admin/people/permissions form or use the following update script.

### The Drupal7 hook_update_N method
In your custom module, place the following code in your modules .install file (to learn more about update hooks visit https://api.drupal.org/api/drupal/modules!system!system.api.php/function/hook_update_N/7).

{% gist 3dc7a2f54c5fbe9f567b %}

### Bonus: The jQuery method
If you need to batch assign permissions in an environment that is not suitable for the update hook method then visit the admin/people/permissions page of your website and run the following code using your browsers web inspector.

{% gist 8ee45abb1a0eb5855326a5891c141171 %}