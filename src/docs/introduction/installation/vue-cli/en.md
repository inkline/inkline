---
title: Vue CLI Installation
description: Install Inkline using the official Vue CLI plugin and get Inkline automatically set up for you.
---

# Vue CLI Installation
## Install Inkline using the official Vue CLI plugin and get Inkline automatically set up for you.

### Installation
After you've [created a Vue CLI Project](https://cli.vuejs.org/guide/creating-a-project.html), install Inkline using the following command:

~~~bash
vue add @inkline/inkline --customizable
~~~

The command above uses the Vue CLI, if you don't have it installed globally, you can install it using `npm install -g @vue/cli`.

If you're not planning to change Sass variables or take advantage of tree shaking, you can leave out the `--customizable` flag to use the bundled files.

### Integration
By running the command above, you have added Inkline to your Vue CLI project. Here's what happened behind the scenes:

- `@inkline/inkline` and its dependencies have been added to your `package.json` file:

~~~json
{
    "dependencies": {
        "@inkline/inkline": "^2.0.0"
    },
    "devDependencies": {
        "node-sass": "<5.0.0",
        "sass-loader": "<11.0.0"
    }
}
~~~

- `@inkline/inkline` plugin, components, and stylesheet have been imported and integrated in your `src/main.js`:

~~~js
import Vue from 'vue';
import { Inkline } from '@inkline/inkline/src';
import * as components from '@inkline/inkline/src/components';
import '@inkline/inkline/src/inkline.scss';

Vue.use(Inkline, { components });
~~~

- `@inkline/inkline` has been added to `transpileDependencies` inside of your `vue.config.js` file. If you don't have a `vue.config.js` file, it has been created automatically:

~~~js
module.exports = {
    transpileDependencies: ["@inkline/inkline"]
}
~~~

### Plugin Options
Optionally, you can configure your <nuxt-link :to="{ name: 'docs-introduction-plugin-options' }">Plugin Options</nuxt-link> by changing the `config` field in our `src/main.js` integration.

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

Customizing Inkline is very straightforward. First, install a utility plugin to easily import our variables file:

~~~bash
npm install --save-dev style-resources-loader vue-cli-plugin-style-resources-loader
~~~

Next, create a `variables.scss` file inside of your `src/assets` folder. The important part is to make sure our `variables.scss` file gets included before every Sass file that Inkline provides.

~~~scss
// src/assets/variables.scss

$color-primary: #178bb2;
$color-secondary: #5d65b9;
~~~

Last but not least, add the following to the `pluginOptions` field in your `vue.config.js`:

~~~js
const path = require('path');

module.exports = {
  
    // ... The rest of the configuration 
  
    transpileDependencies: ["@inkline/inkline"],
    pluginOptions: {
        'style-resources-loader': {
            'preProcessor': 'scss',
            'patterns': [
                path.resolve(__dirname, 'src/css/inkline/config/index.scss'),
                path.resolve(__dirname, 'src/assets/variables.scss'),
            ]
        }
    }
}
~~~

Don't forget to restart your application if it is already running.

<small class="_float-left _text-muted">(Optional)</small>
### Tree Shaking

Tree shaking means eliminating code that isn’t actually being used from the final bundle. To take advantage of tree shaking, you can import Inkline's components individually from the source files:

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
