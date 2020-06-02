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

**Install using `@vue/cli`:**

~~~css
vue add @inkline/inkline
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
To configure Inkline when using `@vue/cli`, add Inkline to the transpiled dependencies array, inside of your `vue.config.js` file:

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
import '@inkline/inkline/src/inkline.scss';
import { Inkline } from '@inkline/inkline/src';
import * as components from '@inkline/inkline/src/components';

Vue.use(Inkline, { 
    components
});
~~~

##### Tree Shaking
Tree shaking means eliminating code that isn’t actually being used from the final bundle. First, make sure you followed the steps in the <a href="#configuration">Configuration</a> section. 

To take advantage of tree shaking, you can import Inkline's components individually from the source files:

~~~js
import Vue from 'vue';
import '@inkline/inkline/src/inkline.scss';
import { Inkline } from '@inkline/inkline/src';
import { IButton, IForm, IInput } from '@inkline/inkline/src/components';

Vue.use(Inkline, {
    components: {
        IButton,
        IForm,
        IInput
    }
});
~~~

##### Plugin Options
You can configure some of Inkline's behaviour globally using the `config` field. Here are the default configuration options:

~~~js
Vue.use(Inkline, {
    components: {},
    config: {
        validation: {
            on: ['input'],
            keys: {
                VALUE: 'value',
                NAME: 'name',
                FIELDS: 'fields',
                VALIDATE: 'validate',
                VALIDATE_ON: 'validateOn',
                VALIDATORS: 'validators',
                INVALID: 'invalid',
                VALID: 'valid',
                TOUCH: 'touch',
                TOUCHED: 'touched',
                UNTOUCHED: 'untouched',
                DIRTY: 'dirty',
                PRISTINE: 'pristine',
                SET: 'set',
                ADD: 'add',
                REMOVE: 'remove',
                ERRORS: 'errors'
            }       
        },
        variant: 'light',
        autodetectVariant: false
    }
});
~~~


### Nuxt.js Module
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
