---
layout: post
title: Drupal debugging&#58; Xdebug and Devel
category: Development
tags:
 - Drupal
 - PHP
 - Xdebug
---

Being able to debug core, contributed and custom code efficiently and verbosely is hugely important when developing with Drupal. The two main methods used in the industry are Xdebug and Devel DPM and both have strengths and weaknesses which will be discussed in this tutorial along with some information on how to get set up.

--- 

### Devel: Meet dpm & kpr

By far the easiest way to start debugging on a Drupal site is to use Devel's debugging functions dpm() (Drupal Print Message) and kpr() (Krumo Print Readable).

#### To start using Devel

1. Download a copy of the [Devel module](https://drupal.org/project/devel) and enable it on your development environment.
2. After you've enable Devel visit the admin page at **/admin/config/development/devel** and change the 'Error handlers' select option to 'Kumo backtrace above the rendered page'. This will give provide you with in-depth back-traces whenever critical errors occur on your site and allow you to better understand what's causing errors to happen in the first place.

#### Your first debug: dpm()

1. Make sure you're logged in as an administrator or your user account has the permission 'Access developer information' enabled.
1. Edit *modules/node/node.module* and search for the function *node_build_content*.
1. Straight after the function declaration write the line: `dpm(``$node``,` `'Debugging node '` `.` `$node``->title);`
1. Save *node.module* and visit a page which contains a node.
1. You should now see an orange debug widget in the messages section of the site. You can drill down and inspect array and object values simply by clicking around.
1. Remember to undo all your changes to *node.module* after you have finished debugging.

#### kpr()

kpr() works similarly to dpm() however it doesn't accept a second argument for labelling and, instead of waiting for for the page to load and displaying the debug in the messages section of your site template, kpr prints the krumo debug widget the second it's called. kpr() is particularly useful when debugging fatal errors that prevent the page from loading far enough to display messages in the message area.

--- 

### Xdebug with an IDE

Ever since I contracted for [Business Spectator](http://www.businessspectator.com.au/) I've been addicted to using Xdebug to debug code using PHP Storm as my IDE of choice. If you don't feel like forking out the cash for PHP Storm Netbeans, Eclipse and Sublime's xdebug_client all support Xdebug as well.


### Enabling Xdebug in your stack

#### Have MAMP Pro installed?

1. Open MAMP Pro and, in the menu bar, select *File > Edit Template > PHP > {The current version you're using}*.
1. Search the ini file for the word *xdebug*. You can open the search dialog by using [CMD+F]
1. Uncomment the line just below *[xdebug]* by removing the preceding semicolon. You should now have a line which looks like\
    *zend_extension="/Applications/MAMP/bin/php/php5.4.10/lib/php/extensions/no-debug-non-zts-20100525/xdebug.so"*
1. Add the line *xdebug.remote_enable=1* below the line you just uncommented
1. Save the file (CMD+S), close the file and click *Stop* and then *Start* in MAMP Pro to restart the server and refresh the settings.


#### No MAMP Pro?

There's documentation on how to install Xdebug on xAMP stacks at <http://xdebug.org/docs/install> for those without MAMP Pro setups.

### Get a helper extension for your browser of choice

Before you start debugging you'll need to download an Xdebug plugin for your browser of choice. Xdebug browser plugins set a cookie that Xdebug responds to triggering a debug session to open.

-   **Chrome:** <https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc?hl=en>
-   **Firefox:** <https://addons.mozilla.org/en-US/firefox/addon/easy-xdebug/>
-   **Manually:** You can force Xdebug to start a debugging session by appending the query string ?XDEBUG_SESSION_START=1 to any page url.

### Setting breakpoints and listening for connections in PHP Storm

1. Open up your project in PHP Storm and select *Run > Start Listen for PHP Debug Connections*.
1. Open *modules/node/node.module* and add a breakpoint just below the opening function declaration for *node_build_content* by clicking the blank gutter space to the right of the line number.
1. Visit /node on your local instance of the site and, in your browser of choice, enable Xdebug by clicking on the small bug icon in the address bar (Chrome) or status bar (Firefox).
1. Refresh the page and PHP Storm steals focus with its debug window show at the bottom of the project workspace preventing the page from loading.
1. You can now inspect variables using the the variables tab of the debug panel as well as step through the code by clicking the step through button above the debug panel that looks like two dots, one underneath the other with an arrow joining them.

--- 

### Devel vs Xdebug: Pros and Cons 

#### Devel

##### Pro's

-  Can be used without a fully fledge IDE or IDE extension.
-  Can be easily used on remote development setups.
-  Easy to understand for beginners, simply call the dpm or kpr functions anywhere in the Drupal code base and you'll get a result.

##### Con's

-  No step through.
-  Whole page load has to occur for developer information to be available.
-  Developers can easily accidentally leave dpm's and kpr's within code, crashing production sites.
-  Adding code to core and contributed module files should be done with great care and reverted immediately after debugging is complete.


#### Xdebug

##### Pro's

-  Step through helps you advance line by line through the code base waiting for fatal crashes and monitoring variables as they change.
-  Backtrace allows you to see exactly how a breakpoint was reached.
-  Program execution is paused during debugging drastically decreasing the time it takes to get debug information.
-  Better variable drilling for complex classes and recurring values.
-  Doesn't require switching between source code and browser render, code is debugged directly in the code editor.

##### Con's

-  Difficult to set up on remote development environments.
-  Requires an IDE or extension which can slow down your development environment.