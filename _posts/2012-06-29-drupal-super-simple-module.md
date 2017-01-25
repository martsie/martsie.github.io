---
layout: post
title: Super simple custom Drupal 7 module
---

Creating custom modules is handy for when you need to hook into and modify Drupal features or add new functionality without hacking core files or overloading your theme. Creating a custom module is really easy, in fact you only really need 2 files to get started...

---

### Create a folder
Before we start, we need to create a folder that has the same name our module will. Don't include any special characters and use underscores in place of spaces. Use only lowercase letters and avoid numbers in order to abide by Drupal coding standards. For the purpose of this tutorial lets create a folder called my_custom_module.

---

### The .info file
The .info file is required by Drupal and exists solely to define your module. It doesn't run any code or make your module do anything, it just tells Drupal that your module exists and allows it to be shown in the module list. Your .info file needs to have the same filename as your module's folder (eg my_custom_module.info) and needs to contain the following variables:

-   **name**:\
    What your module is called (ie *Views*, *Block*, *Node* etc etc).
-   **core**:\
    The Drupal core version your module is compatible with (eg 6.x for Drupal 6 or 7.x for Drupal 7).
-   **files** (Drupal 7):\
    An un-keyed array of include files required by your module (for classes) - this is only required in Drupal 7 and is useful when you want to extend classes.

The following variables are optional:

-   **description**:\
    A brief description of what your module actually does (e.g. *Creates a block in Drupal that lists the latest news posts*).
-   **package**:\
    If you'd like to group your module in the same section as other modules on the module page you can put them in the same 'package'.
-   **dependencies**:\
    If your custom module depends on another Drupal module, core or contrib, list it here (use its machine name).
-   **stylesheets**:\
    You can specify a stylesheet to include on every page whilst your module is enabled (though it may be better to only include a stylesheet when it's needed by using drupal_add_css).

You can also create comments using a semicolon.

Below is our example my_custom_module.info file

{% gist 1465f78a65f2bcf799e2f9621fd4ade5 %}

---

### The .module file (and hooks ... the building blocks of Drupal module development)
The .module file is where all our awesome PHP will be run from and will use the same name as our .info file (my_custom_module.module). Drupal uses hooks (<http://api.drupal.org/api/drupal/includes!module.inc/group/hooks/7>) in order to add or modify output and run actions during different stages of the page build process. The simplest hook to implement in your module is hook_init() which runs after the Drupal bootstrap at the beginning of the page load. In order to use a hook in your module simply replace the word '*hook*' with your custom module name, so hook_init() becomes my_custom_module_init().

Below is an example for our custom module my_custom_module.module that changes the page title on every page. It's also worth noting the commenting and coding standards document at <http://drupal.org/coding-standards/> which will help you write professional and industry accepted code.

{% gist 25c5632a1841d37b69cb0404952935ad %}

---

### All together now
So all we did is create a folder with two identically named files inside it and a few lines of code later we're in the magical land of custom modules and hooks. A quick note, use custom modules sparingly! Contributed modules are heavily tested against coding standards and security best practice as well as being constantly stress tested by the community therefore they are generally a more stable way of adding functionality to your site. There are however times when you need to do something truly custom and, leveraging the power of hooks, it's possible to create really individual pieces of site functionality without having to hack core files.
