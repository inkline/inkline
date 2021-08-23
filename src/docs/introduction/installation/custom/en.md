---
title: Custom Installation
description: Take control of the process and install Inkline manually using an application bundler of your choice.
---

# Custom Installation
## Take control of the process and install Inkline manually using an application bundler of your choice.

### Installation

After you've created a custom Vue.js project configuration using a bundler such as <a href="https://webpack.js.org" rel="nofollow">WebPack</a>, you're ready to install Inkline.

~~~bash
npm install --save @inkline/inkline
~~~

### Integration
Here you can choose between importing the bundled library files directly, and importing Inkline à la carte and having a fully customizable and tree-shakable installation.

#### a. Non-customizable
While you can still override styles, you will not be able to work with Sass variables or import components separately by using the already bundled files.

Inside your main application file (usually `src/main.js`), import the core styles and script bundled files, after which we register the Inkline Vue.js Plugin.

~~~js
import Vue from 'vue';
import '@inkline/inkline/dist/inkline.css';
import Inkline from '@inkline/inkline';

Vue.use(Inkline);
~~~

The code above will import and register all of Inkline's components by default.

This is it for the non-customizable installation. Start using the many components and utilities that Inkline has to offer!

#### b. Customizable
The customizable setup requires Sass in order to compile the styles, therefore we need to install it:

~~~bash
npm install --save-dev node-sass@4 sass-loader@10
~~~

Make sure you configure your application bundler appropriately to work with `.scss` files. If you're using WebPack, here's the official <a href="https://webpack.js.org/loaders/sass-loader/" rel="nofollow">sass-loader integration guide</a>.

Next, inside your main application file (usually `src/main.js`), import the core styles and script source files, after which we register the Inkline Vue.js Plugin.

~~~js
import Vue from 'vue';
import '@inkline/inkline/inkline.scss';
import { Inkline } from '@inkline/inkline';
import * as components from '@inkline/inkline/components';

Vue.use(Inkline, { 
    components
});
~~~

### Plugin Options
Optionally, you can configure your <nuxt-link :to="{ name: 'docs-introduction-plugin-options' }">Plugin Options</nuxt-link> by changing the `config` field, in the file where you've added the Vue Plugin integration.

~~~js
Vue.use(Inkline, {
    components,
    config: {
        variant: 'light',
        validation: {
            validateOn: ['input']      
        }
    }
});
~~~

### Customization
Customizing Inkline is very straightforward. First, create a `variables.scss` file inside of your `src/assets` folder.

~~~scss
// src/assets/variables.scss

$color-primary: #178bb2;
$color-secondary: #5d65b9;
~~~

Next, the important part is to make sure that the `variables.scss` file is imported in every component stylesheet imported from Inkline.

For a custom WebPack setup, make sure you have `sass-loader` installed and properly configured, and add the `options.import` field as follows in your `webpack.config.js`:

~~~js
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules(?!\/@inkline\/inkline)/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            import: [
                                path.resolve(__dirname, 'src/assets/variables.scss')
                            ]
                        },
                    },
                ],
            }
        ],
    },
}
~~~

**Note:** Inkline's source code will need to be compiled, so make sure that you don't exclude the entire `node_modules` folder in your rules for `.js` and `.scss` files.

<small class="_float-left _text-muted">(Optional)</small>
### Tree Shaking
Tree shaking means eliminating code that isn’t actually being used from the final bundle. To take advantage of tree shaking, you can import Inkline's components individually from the source files:

~~~js
import Vue from 'vue';
import '@inkline/inkline/inkline.scss';
import { Inkline } from '@inkline/inkline';
import { IButton, IForm, IInput } from '@inkline/inkline/components';

Vue.use(Inkline, {
    components: {
        IButton,
        IForm,
        IInput
    }
});
~~~

