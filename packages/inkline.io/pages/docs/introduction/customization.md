# Customization
## Make Inkline your own using hundreds of configurable Stylus variables. {.lead}

### Build Dependencies

To customize Inkline, we'll need to make sure we import the source code instead of the compiled files. This comes with a new set of dependencies:

~~~html
npm install --save-dev stylus
npm install --save-dev stylus-loader
npm install --save-dev postcss-preset-env
~~~

### Update Imports

Next, we need to make sure we're importing the source code instead of the build files. This will allow us to recompile the Inkline styles whenever we change something in the project.

~~~js
import Vue from 'vue';
import '@inkline/inkline/src/index.styl';
import Inkline from '@inkline/inkline/src/index';

Vue.use(Inkline);
~~~

### Variables

Create a new Stylus file called `variables.styl`, where we'll define the values you want to use with Inkline. Let's say we want to override the primary and secondary colors for all components.

~~~css 
--color-primary := #d84550
--color-secondary := #f49b4e
~~~

### Configuration

Last but not least, the important part is to make sure our `variables.styl` file gets included before every Stylus file that Inkline provides.

#### Using `@vue/cli`

First, install the utility plugin to easily import style resources. 

~~~html
npm install --save-dev vue-cli-plugin-style-resources-loader
~~~

Add the following to the `pluginOptions` field in your `vue.config.js`:

~~~js
const path = require('path');

module.exports = {
  
    // ... The rest of the configuration 
  
    transpileDependencies: ["@inkline/inkline"],
    pluginOptions: {
        'style-resources-loader': {
            'patterns': [
                path.resolve(__dirname, 'path/to/variables.styl'),
            ]
        }
    }
}
~~~

#### Using `webpack`

Make sure you have `stylus-loader`, the loader for Stylus files installed and properly configured as follows in your `webpack.config.js`:

~~~js
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.styl$/,
                exclude: /node_modules(?!\/@inkline\/inkline)/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'stylus-loader',
                        options: {
                            import: [
                                path.resolve(__dirname, 'path/to/variables.styl')
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


#### Using `nuxt`

First, install the utility plugin to easily import style resources. 

~~~html
npm install --save-dev nuxt-stylus-resources-loader
~~~

Add the following to the `modules` field in your `nuxt.config.js`:

~~~js
const path = require('path');

module.exports = {
  
    // ... The rest of the configuration 
  
    modules: [
        ['nuxt-stylus-resources-loader', path.resolve(__dirname, 'path/to/variables.styl')]
    ],
    build: {
        transpile: ['@inkline/inkline']
    }
}
~~~
