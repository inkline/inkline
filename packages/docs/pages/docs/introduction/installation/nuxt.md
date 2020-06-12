# Nuxt.js Installation
## Install Inkline using your favorite package manager and get access to the latest source code and compiled CSS and JavaScript. {.lead}

Inkline provides you with an easy to use <a href="https://nuxtjs.org" rel="nofollow" target="_blank">Nuxt.js</a> module. Inkline uses Sass, so you will need to install it as a dependency as well:


~~~css
npm install --save-dev @inkline/nuxt node-sass sass-loader
~~~

##### Basic Usage
Next, add `@inkline/nuxt` to the modules section of your `nuxt.config.js`. This provides you with some amazing features out of the box:

- Easy setup with best practices
- Dynamic component imports integration using <a href="https://github.com/nuxt/components" rel="nofollow noreferrer">@nuxt/components</a>
- Perfectly optimized and automatic tree shaking

~~~js
module.exports = {
    modules: [ '@inkline/nuxt' ]
}
~~~

##### Configuration
Optionally, you can configure your Inkline Nuxt.js Module using the plugin configuration options seen [here](#plugin-options):
 
~~~js
module.exports = {
    modules: [ '@inkline/nuxt' ],
    inkline: {
        config: {
            variant: 'dark'
        }   
    }
}
~~~
