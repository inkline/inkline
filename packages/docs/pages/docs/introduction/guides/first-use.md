# Customization
## Prepare Inkline for tree shaking and Sass variables customization. {.lead}

### Install Dependencies

To customize Inkline, we'll need to make sure we import the source code instead of the compiled files. This comes with a new set of dependencies:

~~~html
npm install --save-dev node-sass sass-loader
~~~

### Update Imports

Next, we need to make sure we're importing the source code instead of the build files. This will allow us to recompile the Inkline styles whenever we change something in the project.

~~~js
import Vue from 'vue';
import '@inkline/inkline/src/inkline.scss';
import { Inkline } from '@inkline/inkline/src';
import * as components from '@inkline/inkline/src/components';

Vue.use(Inkline, { components });
~~~

### Sass Variables

Create a new Sass file called `variables.scss`, where we'll define the values you want to use with Inkline. Let's say we want to override the primary and secondary colors for all components.

~~~scss 
$color-primary: #D84550;
$color-secondary: #F49B4E;
~~~

### Configuration

Last but not least, the important part is to make sure our `variables.scss` file gets included before every Sass file that Inkline provides.

#### Using `@vue/cli`

First, install the utility plugin to easily import style resources. 

~~~html
npm install --save-dev style-resources-loader vue-cli-plugin-style-resources-loader
~~~

Add the following to the `pluginOptions` field in your `vue.config.js`:

~~~js
const path = require('path');

module.exports = {
  
    // ... The rest of the configuration 
  
    transpileDependencies: ["@inkline/inkline"],
    pluginOptions: {
        'style-resources-loader': {
            'preProcessor': 'scss',
            'patterns': [
                path.resolve(__dirname, 'path/to/variables.scss'),
            ]
        }
    }
}
~~~

#### Using `nuxt`

First, install the utility plugin to easily import style resources. 

~~~html
npm install --save-dev @nuxtjs/style-resources
~~~

Add the following to the `modules` field in your `nuxt.config.js`:

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



#### Using `webpack`

Make sure you have `sass-loader`, the loader for Sass files installed and properly configured as follows in your `webpack.config.js`:

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
                                path.resolve(__dirname, 'path/to/variables.scss')
                            ]
                        },
                    },
                ],
            }
        ],
    },
}
~~~

**Note:** Inkline's source code will need to be compiled as well, so make sure that you don't exclude the entire `node_modules` folder.

