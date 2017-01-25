---
layout: post
title: Using Backbone.js with CoffeeScript
---

If you want an example of just how elegant CoffeeScript can get, look no further then how it integrates with Backbone.js. In this tutorial we're creating a model and a collection in Backbone.js in it's simplest form, then expanding it to include API variable mapping - something you're going to have to do when integrating with API's in the future.

--- 

### Create a model
Time to create a model. If you're unfamiliar with what a model is in the context of a Model-View-Controller architectural pattern the simplest explanation is that a models only role is to store data. No data manipulation, no processing, no view manipulation and no user interaction processing.

{% gist 49a1f69ee76639fbae1ed982a6c11847 %}

OK that's maybe a little too basic, let's expand it with some default values.

{% gist ab1b052cf5466ff3c384b9a4f0a3a24c %}

Going through this line by line:

-   Line 2 defines the class as it extends Backbone.model. It's technically all you need but by itself it doesn't really give the user an indication of what data is being held by the model.
-   Lines 3 to 7 define default values for the model. If the model is instantiated with no values, it will use these values instead. This means that you can build your Views always assuming that the variables you've defined are available which makes your Views highly portable and much less complex.
-   Lines 8 to 12 create a new comment, overriding the default values.
-   The final line shows an example of how to access a variable from the model

--- 

### Creating a Backbone.js collection to add the models to
In Backbone.js collections in their simplest form are a way of storing multiple models of the same type.

{% gist 8b5e39890be4798538e2139f260f681d %}

Let's break this down...

-   The first 3 lines define the collection and tell Backbone that the collection houses the Comment model.
-   Next, an instance of the collection is created for this example.
-   Finally we add a few dummy comments. The collection will automatically convert those JSON objects into models when added to the collection, complete with default values and all.

--- 

### API integration
One of the best features of Backbone.js collections is that they support API integration out of the box with very minimal configuration. In this example I'm going to redeclare everything from this tutorial so you have a full view of everything required to create a Backbone.js model and collection, and integrate it with an API using CoffeeScript.

{% gist bfe40af7a9dbc81b7224501be1938deb %}

How simple is that...

-   First we define the comment model, with a few defaults
-   Next we define a collection, tell it to use the Comment model and give it our REST endpoint URL.
-   Then we create a new instance of the collection.
-   Finally we tell the collection to go fetch us some comments. The comments are automatically mapped to variables in the Backbone.js model.