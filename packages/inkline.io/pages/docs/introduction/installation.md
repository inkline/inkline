# Installation
## Install Inkline using your favorite package manager and get access to the latest source code and compiled CSS and JavaScript. {.lead}

### Basic Installation
You can install Inkline using one of the following package managers:

**Install using `npm`:**

~~~css
npm install --save @inkline/inkline
~~~

**Install using `yarn`:**

~~~css
yarn add @inkline/inkline
~~~

**Install using `composer`:**

~~~css
composer require inkline/inkline
~~~

##### Usage
First, we'll import the core styles, after which we import and register the script files. If you already have your Webpack configuration ready for Vue, importing the framework is as simple as:

~~~js
import Vue from 'vue';
import '@inkline/inkline/dist/inkline.css';
import Inkline from '@inkline/inkline';

Vue.use(Inkline);
~~~

**You're all set!** Start using the many components and utilities that Inkline has to offer.

### Nuxt.js Module
You can easily install Inkline as a <a href="https://nuxtjs.org" rel="nofollow" target="_blank">Nuxt.js</a> module.

~~~css
npm install --save @inkline/inkline
~~~

##### Usage
Next, add **@inkline/inkline/nuxt** to the modules section of your `nuxt.config.js`. This contains the precompiled CSS and JS by default.

~~~js
module.exports = {
    modules: [ '@inkline/inkline/nuxt' ]
}
~~~

##### Configuration
Optionally, you can configure your Inkline Nuxt.js Module using the following configuration options:
 
~~~js
module.exports = {
    modules: [ '@inkline/inkline/nuxt' ],
    inkline: {
        treeShaking: true,
        stylus: true
    }
}
~~~

Keep in mind that, to use stylus, you will need to add stylus as a dependency using `npm install -D stylus stylus-loader`.

You can explicitly import only specific components from Inkline by setting the `components` option.
~~~js
module.exports = {
    modules: [ '@inkline/inkline/nuxt' ],
    inkline: {
        treeShaking: true,
        stylus: true,
        components: [ 'IButton', 'IForm', 'IInput' ]
    }
}
~~~
