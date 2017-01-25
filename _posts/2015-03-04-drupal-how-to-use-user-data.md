---
layout: post
title: How to use the $user->data property in Drupal 7
---

Everything you need to know about how to use the highly performant $user->data property whilst maintaining data integrity with a bit of best practise Single Responsibility Principle and Single-Entry, Single-Exit thrown in for good measure.

### Drawbacks of using Field API
-   Each field you add to the user object will create an entries in field_config and field_config_instance table as well as creating two brand new SQL tables for the data and revisioning information
-   Each field you create is processed through an enormous hook system introducing complexity and and bad performance
-   Each field will automatically appear on user edit forms, which for some user information is not ideal
-   In order to access a current global users fields you often have to reload the user using user_load - once again a performance hit.

### Download the example module
If you don't feel like reading everything below, then feel free to jump on to the Github at [https://github.com/martsie/drupal-user-data-example/](https://github.com/martsie/drupal-user-data-example/) and check out the code.

### The Solution: $user->data
The Drupal user object has a little known field automatically attached to it called 'data' which stores serialised settings for each user object in the database.

#### Advantages
-   It's lightweight, queried with the original user object in the core bootstrap
-   Available as early as hook_boot
-   Available without installing any additional Drupal modules

#### Disadvantages
-   Has no automatically defined front-end interface for displaying or editing data
-   Not available as a condition in SQL select queries
-   Can be abused by developers
-   Has no automatic Views or Rules integration
-   No SQL type checking (eg int, text etc) so data integrity can suffer

{% gist f65db57693acdad8f9111697841f68ec %}

### Don't store and access complex objects in $user->data directly
Although the data property is lightweight it can be abused pretty easily by adding large data sets.

{% gist fa476319b064fbebdd90ee85ec117ff6 %}

Lets break down, line by line, why the above example is wrong.

-   **Line 2:** There is no type checking to ensure this value is a number
-   **Line 3:** Because employee details is an array, there's no knowing what it's properties are and what they should be
-   **Line 4:** Once again, no type checking to ensure this value is a number
-   **Line 5:** No context as to what the access level means and whether it's correct
-   **Line 6:** No type checking and format enforcement to ensure number is a valid date
-   **Line 12:** Other developers need to constantly lookup the data structure (of a serialized array!) to find out where and how things are stored which can lead to very nasty bugs

### OOP to the rescue
Using classes to access and set objects in the data array is a great way of overcoming the issues in the previous section and keeping code clean, maintainable and test-able. Here's what we want to be able to do:

{% gist fd5f4e6e52d451c39b5c5d4b35a4da8e %}

### Some features of the class
-   Unit testable with a mock user object
-   Each function abides by the Single Responsibility Principle (SRP)
-   Each function has Single-Entry, Single-Exit (SESE).
-   Every getter and setter is documented with the type of variables they accept and return
-   Every setter throws exceptions when an unexpected variable type or value is provided
-   Employee access levels are now limited to A, B or C (case sensitive).
-   Employee start date only accepts and returns a fully qualified DateObject
-   Internal getters are used to reduce code duplication however are protected and not exposed to developers
-   If data is migrated to another data store away from the user object it's very easy to change the internal getters and setters to respect that
-   Self documenting code for future developers

Yes there's a lot of boilerplate code and PHP doc commenting but what's affectively happened is we've create an API specific to the user data you're storing! You can read more about SRP and SESE in Clean Code (http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882).

{% gist 65e409186ce04f04da99437fc7dee5cb %}

### Connecting with Entity Metadata Wrappers
The next logical step is to integrate the above class with Entity Metadata Wrappers, especially if it's something you already use in your projects. The problem with Entity Metadata Wrappers however is that they're not available at hook_boot (which is where, especially if you're operating beneath a heavy cache, you'll want to do some of your user reactions) and they can get difficult to use in an IDE that has class method autocompletion. Using Meta Data Wrappers we'll be able to achieve the following level of abstraction...

{% gist d4d4ef2133daa31777ee9060dec3a9f8 %}

The code to retrofit entity api below is quite simple and, because of the strict nature of the EmployeeDetails class, there shouldn't be too many surprises when retrofitting the metadata properties for the other values.

{% gist https://gist.github.com/martsie/205cc8f13c7dfc1b72d3787e4334389f %}

### Download the example
If you're keen on doing some user data manipulation you can download the entire example at:<https://github.com/martsie/drupal-user-data-example/> You don't need to go as far as the Entity API abstraction, especially if you'd like to keep things low level and accessible in hook_boot however the important thing to understand is that even data stored in a serialized format can be stored and retrieved in a structured, strict and testable manor.
