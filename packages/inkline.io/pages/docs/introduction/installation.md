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

The code above will import and register all of Inkline's components by default.

**You're all set!** Start using the many components and utilities that Inkline has to offer.

##### Tree Shaking
Tree shaking means eliminating code that isn’t actually being used from the final bundle. To take advantage of tree shaking, you can import Inkline's components individually from the source files:

~~~js
import Vue from 'vue';
import '@inkline/inkline/src/index.styl';
import { Inkline, IButton, IForm, IInput } from '@inkline/inkline/src/index';

Vue.use(Inkline, {
    components: [
        IButton,
        IForm,
        IInput
    ]
});
~~~

<i-alert variant="info" class="-code"><template slot="icon"><i class="inkline-icon -info h3"></i></template>To use stylus and tree shaking, you will need to add Stylus as a dependency using `npm install -D stylus stylus-loader`.</i-alert>

### Nuxt.js Module
You can easily install Inkline as a <a href="https://nuxtjs.org" rel="nofollow" target="_blank">Nuxt.js</a> module.

~~~css
npm install --save @inkline/inkline
~~~

##### Usage
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
        stylus: true
    }
}
~~~

<i-alert variant="info" class="-code"><template slot="icon"><i class="inkline-icon -info h3"></i></template>To use the `stylus` and `treeShaking` options, you will need to add Stylus as a dependency using `npm install -D stylus stylus-loader`.</i-alert>

##### Tree Shaking
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
