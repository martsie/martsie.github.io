---
layout: post
title: Entity Legal - Legal Document Management for Drupal
category: Development
tags:
 - Drupal 7
 - Open Source
---

Most websites I've personally worked on for clients have had, at minimum, a Terms and Conditions page or Terms of Use page. Recently on the brightday project ([http://brightday.com.au](http://brightday.com.au/)) I was tasked with creating a versionable, auditable and robust legal document framework for storing Financial Services Guides accepted by users and notifying those users when the guide had been updated. Because of how sensitive the data was I didn't think using Node, Rules and glue code would be clean enough so I created Entity Legal to solve this issue for us and for all Drupal devs out there.

**Visit the module page at:** <https://www.drupal.org/project/entity_legal>.

**Check out how to configure and use the module in the video below of the talk I gave at the February Drupal Melbourne meetup:**

<iframe width="560" height="315" src="https://www.youtube.com/embed/Syuqy_23L3M" frameborder="0" allowfullscreen style="max-width:100%"></iframe>

--- 

### Why use versioned documents?

![An example of basic legal versioning](/images/entity-legal-map-overview.png)

Look at the graphic above. When User's A and B joined in April 2014, they accepted version 1 of the terms and conditions. In July version 2 came out which is when User C joined and then the following year in January User D joined, accepting version 3.

Is it really necessary to email Users A and B version 2 of the legal document if the next time they actually use the site is in February? In your use case it may, but in others it may not - and Entity Legal solves that using the re-acceptance method system.

If, for some reason, version 3 is rolled back to version 2 User D will need to be presented version 2 as they only originally agreed to version 3.

Finally, if legal action does occur against your company, wouldn't it be great to see which versions of the agreement the user suing you had agreed to? Entity Legal provides a full audit trail with the date of acceptances.

--- 

### Create a new legal document
![](/images/entity-legal-add.png)

A legal document is a bit like a Node content type in that it does not contain anything user facing, but rather manages the configuration for the document.

To create a new legal document, navigate to

`Structure > Legal documents`

and click '+ Add'.

--- 

### Setting up your document
![Add document screen](/images/entity-legal-add-edit.png)

The 'Add legal document' screen contains the following settings:

#### Administrative label

This is for editors eyes only, and will not be shown to the end user. You can give it any internal code name you wish, however the machine name will be used for the default path and for css classes.

#### New users

When new users go to sign up to the site, do you want to force them to agree to the document? If so there are a couple of methods for displaying it on the user registration form and you can create your own using the method API. **This setting can be changed at any time.**

#### Existing users

When existing users log into the site and they haven't accepted the most recent legal document of this type you can notify them, or force redirect them to the document, until they accept. Once again **this settings can be changed at any time** so no need to set it just yet.

--- 

### The version edit screen

![Terms and Conditions v1](/images/entity-legal-tcs-v1.png)

Next we'll create the first version for this document. Everything here will be public facing so make sure you enter exactly what your users should see.

#### Title & machine name

This is pretty self-explanatory. The title is displayed to end users and the machine name is used internally for classes as well as programatic referencing.

#### Document text

Document text can be added in any available input format. Note that this is not revisioned, so if you make a major change it's best to create a new version instead of modify an existing version.

#### Acceptance label

The acceptance label is what's placed next to the agreement checkbox on the document page.

--- 

### Permissions

![Permissions page](/images/entity-legal-permissions_0.png)

The only confusing part of this process is setting up permissions. Entity legal uses the core Drupal user permissions system to decide which users are allowed to view legal documents and which users must re-accept them.

Visit *admin/people/permissions* and find your legal document and enable the appropriate permissions. For re-acceptance (when an existing user must re-accept a new version of a legal document) check the box next to roles that should re-accept. This might seem counter intuitive at first as many user permissions are about bypassing a requirement rather than enforcing a requirement however this makes sense on larger sites in which you want to choose which users must accept which documents.

**Important:** Always give at least 'view' permissions to users you are requiring to accept the document otherwise they'll be presented with an access denied page instead of your legal document.

--- 

### Managing multiple versions

![The document overview page](/images/entity-legal-multiple-versions_0.png)

Once you've added more than one version you'll need to choose which version is your current published version, and the one that users must agree to. On the document overview screen, in the *Current version* section there is a table with all your legal document versions and created/updated dates.

The radio on the left corresponds to which version is the current, public-facing one that users must accept. You can change it at any time by selecting a different version and clicking *Save* however by doing this you may not only be presenting the new document to signups but also presenting it to existing users, depending on your settings.

--- 

### Managing acceptances using Views

![The acceptance page](/images/entity-legal-acceptances_0.png)

Entity legal uses the Entity API to power it's document management system and therefore is fully compatible with the Views module. By default, if you have Views enabled, on the legal document overview page there is an *Acceptances* tab page built in views. The views displays all acceptances for each legal document version and the date that the version was accepted. You can further extend this by overriding the view and providing any extra columns you'd like.

You could also fairly easily create a view for displaying a users own acceptances on their profile page or another area on your site. Acceptances themselves are Entities and allow for a lot of modification by developers familiar with Entity API - have a look at the `EntityLegalDocument` and `EntityLegalDocumentAcceptance` classes for some common setters and getters if you're interested in tinkering.

--- 

### Conclusion

Entity Legal provides a fairly easy to use but powerful legal document management system that could be useful down the track if your business grows or there's risk of litigation. By keeping users up to date with changing terms and conditions you are doing the 'right thing' as many sites often include a clause stipulating that they can change the terms and conditions at will without the user having to re-agree. Sites built in commerce, in particular, can benefit from having order conditions agreed too at different stages during checkout without needing a user to re-agree to the same document twice.

Entity Legal is far superior to using a custom Node content type and managing agreements through glue code and even supports Features based storage if you'd like to keep a trail of changes in GIT.