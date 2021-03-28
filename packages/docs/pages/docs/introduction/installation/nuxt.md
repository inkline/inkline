---
title: Nuxt.js Installation
description: Install Inkline using the official Nuxt.js module and get Inkline automatically set up for you. 
---
### Installation
After you've [created a Nuxt.js Project](https://nuxtjs.org/guide/installation/), install Inkline using the following command:

~~~bash
npm install --save-dev @inkline/nuxt
~~~

Inkline uses Sass as a peer dependency to compile its styles, so we'll need to add it to our Nuxt.js installation as well:

~~~bash
npm install --save-dev node-sass@4 sass-loader@10
~~~

Next, add `@inkline/nuxt` to the `modules` section of your `nuxt.config.js` file:

~~~js
module.exports = {
    // ... The rest of the configuration 

    modules: [ '@inkline/nuxt' ]
}
~~~

### Integration
By following the steps above, you have added Inkline to your Nuxt.js project. This provides you with some amazing features out of the box:

- Easy setup with best practices
- Dynamic component imports integration using <a href="https://github.com/nuxt/components" rel="nofollow noreferrer">@nuxt/components</a>
- Perfectly optimized automatic tree shaking

### Plugin Options
Optionally, you can configure your <nuxt-link :to="{ name: 'docs-introduction-plugin-options' }">Plugin Options</nuxt-link> through the Nuxt.js Module by using the `inkline` field:
 
~~~js
module.exports = {
    // ... The rest of the configuration 

    modules: [ '@inkline/nuxt' ],
    inkline: {
        config: {
            variant: 'dark'
        }   
    }
}
~~~

### Customization
Customizing Inkline is very straightforward. First, install a utility plugin to easily import our variables file:

~~~bash
npm install --save-dev @nuxtjs/style-resources
~~~

Next, create a `variables.scss` file inside of your `assets` folder. The important part is to make sure our `variables.scss` file gets included before every Sass file that Inkline provides.

~~~scss
// assets/variables.scss

$color-primary: #178bb2;
$color-secondary: #5d65b9;
~~~


Add the `@nuxtjs/style-resources` entry to the `modules` field in your `nuxt.config.js` file, and configure it to import our `assets/variables.scss` file:

~~~js
const path = require('path');

module.exports = {
    // ... The rest of the configuration 
  
    modules: [
        '@nuxtjs/style-resources',
        '@inkline/nuxt'
    ],
    styleResources: {
        scss: ['~/assets/variables.scss']
    }
}
~~~
