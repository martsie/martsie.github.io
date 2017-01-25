---
layout: post
title: Resetting a Drupal 7 module schema with Drush
---

There are times when you're testing hook_update_N hooks and need to revert to a previous schema version to re-run your update hook. For example if your developing an update called **my_custom_module_update_7002** and you run it there are only two ways you can re-run that update hook; 1, incrementing the update name to *my_custom_module_update_7003* or 2, resetting my_custom_module's schema in the system table to be 7001.

With Drush you can quickly and easily reset the module schema using sql by using the following command:

`drush sql-query "UPDATE system SET schema_version = 7001 WHERE name = 'my_custom_module';"`

where 7001 is the schema you want to reset to and my_custom_module is the name of the module you're changing.
