---
title: CDN Installation
description: Install Inkline using the official JSDelivr CDN integration. The content delivery network (CDN) provides super fast asset delivery from a server that is closest to you. 
---

The quickest way to get started, with minimal setup, is to add the files from a CDN. 

If you're not using using package managers and build systems and you want to add Inkline to your project, you can import the compiled files from:

~~~html
<link href="https://cdn.jsdelivr.net/npm/@inkline/inkline/dist/inkline.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@inkline/inkline/dist/inkline.js"></script>
~~~

### Starter Template

To quickly test Inkline, copy the code below into your `index.html` or try it out live on <a href="https://jsfiddle.net/alexgrozav/0dknfs6L/" rel="nofollow">JSFiddle</a>. This will pull the latest version of Vue and Inkline, allowing you to start playing around with Vue and Inkline's components. 

Be sure to have your pages set up with the latest design and development standards, using an HTML5 doctype and including a viewport meta tag for proper responsive behavior.

~~~html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://cdn.jsdelivr.net/npm/@inkline/inkline/dist/inkline.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>
<body>
  <div id="app">
    <i-container>
      <i-row>
        <i-column>
          <h1>Welcome to Inkline!</h1>
          <p>This is your starter page. Make sure to read the documentation to learn about what Inkline has to offer.</p>
          <i-button href="https://inkline.io/docs/introduction/getting-started">Read Documentation</i-button>
        </i-column>
      </i-row>
    </i-container>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@inkline/inkline/dist/inkline.js"></script>
  <script>
    new Vue({ 
        el: '#app' 
    });
  </script>
</body>
</html>
~~~

<div class="_margin-top-1">
    <a class="link-card" href="https://jsfiddle.net/alexgrozav/0dknfs6L/">
        <i-card>
            <div class="image"><img src="/images/jsfiddle.svg" alt="JSFiddle" /></div>
            <span>Try on JSFiddle</span>
            <i-icon icon="chevron-right"></i-icon>
        </i-card>
    </a>
</div>
