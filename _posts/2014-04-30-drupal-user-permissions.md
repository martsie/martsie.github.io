---
layout: post
title: User permissions in Drupal
---

In Drupal, the user permissions system plays a vital role in providing fine grained access to content and settings forms on a site. By default most modules, contributed and core, come with in built permissions for managing access to their features but it’s also easy to introduce your own permissions using hook_permission() and user_access(). Permissions can not only be used to restrict what pages visitors can view but also what parts of a page are rendered to a given user resulting in a safe and personalised experience for all your site visitors.

--- 
### Defining your new permission types

In order for your permissions to show up on the admin/people/permissions page to be assignable to roles you’ll need to first define it in your module (if you don’t know how to create a module, check out my Super simple custom module tutorial). You can define as many permissions as you want and they’ll be grouped together automatically on the permissions page using your module name.

{% gist 869dc26daf030753d0abb10c80cbeeee %}

--- 
### Assigning your permissions to users

Assigning your permissions* to *users
-------------------------------------

![Screenshot of permissions screen](/images/permissions-drupal.jpg)

After you've defined your new permission types, make sure you clear your cache by visiting admin/config/development/performance and hitting Clear all caches. Permissions are assigned to user roles, and users inherit all the permissions that are enabled for their assigned roles. By default, Drupal comes with 3 roles; **Anonymous user**, **Authenticated user** and **Administrator**. You can add more roles by visiting admin/people/permissions/roles and you can add as many roles as you like, though it's uncommon for a site to need more than 5 or 6.

--- 
### In this example:

1. Visit admin/people/permissions
1. Find the permission you defined above
1. Tick the box next to the authenticated user role
1. Click Save permissions

The admin user of the site (uid 1) will always automatically be granted all permissions available.

--- 
### Testing for permissions using if statements

You can check to see if a user has a set of permissions at any time during the bootstrap process by using **user_access**. Below is an example that displays a different message to the user depending on whether they have inherited your permission from their role or not.

{% gist 6b9e2775efbc90f1afd0abf7c40a50ca %}

--- 
### Using existing permissions defined by Drupal

There are heaps of existing permissions defined by Drupal and it’s modules available to use in your own custom modules. Before defining custom permissions it's worth having a look at admin/people/permissions and checking if there are any permissions that already address the task you're trying to accomplish. If you find one that’s appropriate, find the permission name by inspecting the radio’s name value and using it in user_access the same as you would when checking that a user has a custom permission. To do this you’ll also need to add a dependency to the module being referenced to your module’s .info file to make sure you always have access to the given permission.

{% gist c08b0c69cf2b48c47ca5a323f2a6369c %}

--- 
### Terminating a currently running operation if a user does not have permissions

In certain security sensitive situations you might find that you want to prevent a page load from continuing if a user doesn’t have the right permissions. The safest way to accomplish this is by using user_access() in combination with drupal_access_denied() which will return a 403 page to the end user. Below is an example of how this could be accomplished site wide.

{% gist 25354da906cb828e6f74b0dc190d44c0 %}

--- 
### Controlling access to specific node types

In the below example we use a combination of `hook_node_access` and `user_access` to deny users without our custom permission access to view page nodes. One of the great things about hook_node_access is that it influences listing page, blocks and views on the site as well - hiding teasers that should not be shown as well as full pages.

{% gist 25a02bac386535f07b645071d1e942ff %}

--- 
### Controlling access to custom pages on the site

By default, Drupal’s menu router system uses user access to determine whether or not a user is permitted to view a specific page. Below is an example of a custom menu item and page callback at the url /my-custom-page that will only be shown to users with your custom permission above.

{% gist 56e4c6850ea19ea5cfc637b9663a9684 %}

--- 
### Views, panels and contexts

Views, panels and contexts all have their own integration with the permissions system in Drupal allowing you fine control over what is shown to end users. In general, using permissions is better than using roles directly as it allows you more control and flexibility in the long run at the expense of having to define permissions for each task you want to control access to.
