# Getting Started
## Inkline is a modern UI/UX framework for Vue.js, designed for creating flawless content-rich responsive web applications. { .lead }

The quickest way to get started is to add the files from a CDN, with minimal setup. If you're looking to use Inkline with Vue CLI, Webpack or a build system of choice, please read the <nuxt-link :to="{ name: 'docs-introduction-installation' }">Installation</nuxt-link> section.

### CDN

If you're not using using package managers and build systems and you want to add Inkline to your project, you can import the compiled files from CDN:

~~~html
<link href="https://cdn.jsdelivr.net/npm/@inkline/inkline/dist/inkline.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@inkline/inkline/dist/inkline.js"></script>
~~~

### Starter Template

To quickly test Inkline, copy the code below into your `index.html`. This will pull the latest version of Vue and Inkline, allowing you to start playing around with Vue and Inkline's components. 

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

### Demo/Playground

* **JSFiddle:** https://jsfiddle.net/4fvopawj
