# Vue CLI Installation
## Install Inkline using the official Vue CLI plugin and get Inkline automatically set up for you. {.lead}

### Installation

After you've created a [Vue CLI Project](https://cli.vuejs.org/guide/creating-a-project.html), you're ready to install Inkline. If you don't have `@vue/cli` installed globally, you can install it using `npm install -g @vue/cli`.

~~~css
vue add @inkline/inkline --customizable
~~~

Next, add Inkline to the transpiled dependencies array, inside of your `vue.config.js` file. If you don't have a `vue.config.js` file in the root folder of your project, create it:

~~~js
// vue.config.js

module.exports = {
    transpileDependencies: ["@inkline/inkline"]
}
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
        variant: 'light',
        autodetectVariant: false,
        validation: {
            validateOn: ['input'],
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
        }
    }
});
~~~

