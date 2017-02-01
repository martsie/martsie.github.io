---
layout: post
title: Detecting React Native Apps in WebViews
tags:
 - React Native
 - JavaScript
 - Rome2rio
 - Android
---

On the project I'm working on at Rome2rio I'm currently implementing React Native's WebView component and hitting some issues with sending headers and User Agent's reliably. Sometimes User Agent's get rewritten by the website inside (which is very strange) and headers seem to only be applied on the first load and not all requests in the webview. After debugging the `ReactWebViewManager.java` file and getting nowhere, I've found an alternative way which is more reliable and more persistent. 

--- 

### Android's X-Requested-With headers

It turns out that every network request issued by an Android app webview comes with the added bonus of an identifying header by the name of `X-Requested-With` with the value of the package name of your Android app. In our case it's `X-Requested-With: com.www.rome2rio.www.rome2rio`. That means that not only is the page requested with that additional header but all AJAX requests too.

![x-request-with header in Chrome dev tools](/images/x-request-header.png)

--- 

### Implementation

The great thing about this solution is it requires no extra implementation in JAVA or the JavaScript of your React Native app - it's just something that Chrome webviews do by default. The danger of course is that a future update could remove this header in which case you will need to find a way
to explicitly add it again.

