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

### Vue CLI
First, we'll import the core styles, after which we import and register the script files. If you already have your Webpack configuration ready for Vue, importing the framework is as simple as:

~~~js
import Vue from 'vue';
import '@inkline/inkline/dist/inkline.css';
import Inkline from '@inkline/inkline';

Vue.use(Inkline);
~~~

The code above will import and register all of Inkline's components by default.

**You're all set!** Start using the many components and utilities that Inkline has to offer.

##### Configuration
When using `@vue/cli`, add Inkline to the transpiled dependencies array, inside of your `vue.config.js` file:

~~~js
// vue.config.js

module.exports = {
    transpileDependencies: ["@inkline/inkline"]
}
~~~

<i-alert variant="info" class="-code">
<template slot="icon"><i-icon icon="info" class="h4"></i-icon></template>
    
Inkline uses Sass, so you will need to install it as a dependency:<br/> `npm install -D node-sass sass-loader`

</i-alert>

Next, you can import Inkline directly from the source files:

~~~js
import Vue from 'vue';
import '@inkline/inkline/src/index.scss';
import Inkline from '@inkline/inkline/src/main';

Vue.use(Inkline);
~~~

##### Tree Shaking
Tree shaking means eliminating code that isn’t actually being used from the final bundle. First, make sure you followed the steps in the <a href="#configuration">Configuration</a> section. 

To take advantage of tree shaking, you can import Inkline's components individually from the source files:

~~~js
import Vue from 'vue';
import '@inkline/inkline/src/index.scss';
import { Inkline, IButton, IForm, IInput } from '@inkline/inkline/src/index';

Vue.use(Inkline, {
    components: {
        IButton,
        IForm,
        IInput
    }
});
~~~

### Nuxt.js Module
Inkline comes bundled together with an easy to use <a href="https://nuxtjs.org" rel="nofollow" target="_blank">Nuxt.js</a> module.

##### Basic Usage
Next, add `@inkline/inkline/nuxt` to the modules section of your `nuxt.config.js`. This contains the precompiled CSS and JS by default.

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
        scss: true
    }
}
~~~

<i-alert variant="info" class="-code">
<template slot="icon"><i-icon icon="info" class="h4"></i-icon></template>
    
Inkline uses Sass, so you will need to install it as a dependency:<br/> `npm install -D node-sass sass-loader`

</i-alert>

##### Tree Shaking
You can explicitly import only specific components from Inkline adding them to the `components` option.

~~~js
module.exports = {
    modules: [ '@inkline/inkline/nuxt' ],
    inkline: {
        treeShaking: true,
        scss: true,
        components: [ 'IButton', 'IForm', 'IInput' ]
    }
}
~~~
