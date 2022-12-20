<p align="center">
    <a href="https://inkline.io/">
        <img src="https://raw.githubusercontent.com/inkline/inkline.io/main/src/assets/images/logo/logo-black.svg" alt="Inkline" width=72 height=72>
    </a>
</p>

<h1 align="center">@inkline/plugin</h1>

<p align="center">
    The easiest and fastests way to use Inkline with your favorite development environment. We officially support integrations with <a href="https://nuxt.com">Nuxt.js</a>, <a href="https://vitejs.dev">Vite.js</a>, and <a href="https://webpack.js.org">Webpack.js</a>.
    <br/>
    <br/>
    <br/>
    <a href="https://next.inkline.io">Homepage (WIP)</a>
    ·
    <a href="https://next.inkline.io/docs/introduction">Documentation (WIP)</a>
    ·
    <a href="https://storybook.next.inkline.io/">Storybook</a>
    ·
    <a href="https://github.com/inkline/inkline/issues">Issue Tracker</a>
</p>

<br/>

<p align="center">
    <a href="https://www.npmjs.com/package/@inkline/plugin">
        <img src="https://img.shields.io/npm/v/@inkline/plugin.svg" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/@inkline/plugin">
        <img src="https://img.shields.io/npm/dm/@inkline/plugin.svg" alt="Downloads">
    </a>
    <a href="https://chat.inkline.io">
        <img src="https://img.shields.io/discord/550436704482492429.svg" alt="Discord">
    </a>
</p>

<br/>
<br/>

## Table of contents

-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Integrations](#integrations)
-   [Bugs and feature requests](#bugs-and-feature-requests)
-   [Contributing](#contributing)
-   [Community](#community)
-   [Releases](#releases)
-   [Versioning](#versioning)
-   [Creator](#creator)
-   [Copyright and license](#copyright-and-license)


## Installation
~~~bash
npm i -S @inkline/plugin @inkline/inkline@next
~~~

## Configuration
Create an `inkline.config.ts` file and override configuration as needed:

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            color: {
                primary: '#178ab0'
            }
        }
    }
});
~~~

Visit [Configuration Reference](https://github.com/inkline/config) for details.

## Integrations

### Vite.js

Add `@inkline/plugin/vite` to your `vite.config.ts` file's `plugins`.

~~~ts
import { defineConfig } from 'vite';
import { inkline } from '@inkline/plugin/vite';

export default defineConfig({
    plugins: [
        inkline()
    ]
});
~~~

Optionally, configure the integration with your preferred options:

~~~ts
import { defineConfig } from 'vite';
import { inkline } from '@inkline/plugin/vite';

export default defineConfig({
    plugins: [
        inkline({
            configFile: resolve(process.cwd(), 'inkline.config.ts'),
            outputDir: resolve(__dirname, 'src/css/variables'),
            extName: '.scss'
        })
    ]
});
~~~

### Webpack.js

Add `@inkline/plugin/vite` to your `webpack.config.js` file's `plugins`.

~~~ts
const inkline = require('@inkline/plugin/webpack');

module.exports = {
    plugins: [
        inkline()
    ]
};
~~~

Optionally, configure the integration with your preferred options:

~~~ts
const { resolve } = require('path');
const inkline = require('@inkline/plugin/webpack');

module.exports = {
    plugins: [
        inkline({
            configFile: resolve(process.cwd(), 'inkline.config.ts'),
            outputDir: resolve(__dirname, 'src/css/variables'),
            extName: '.scss'
        })
    ]
};
~~~



### Nuxt.js

Add `@inkline/plugin/nuxt` to your `nuxt.config.ts` file's `modules`.

~~~ts
export default defineNuxtConfig({
    modules: ['@inkline/plugin/nuxt']
});
~~~

Optionally, configure the integration with your preferred options:

~~~ts
import { resolve } from 'path';

export default defineNuxtConfig({
    modules: ['@inkline/plugin/nuxt'],
    inkline: {
        /**
         * @inkline/plugin 
         * @description provides import specific options
         */
         
        import: {
            mode: 'global', // Import mode: 'global' | 'auto'
            styles: true,   // Import styles using the module
            scripts: true,  // Import scripts using the module
            utilities: true // Import utility classes using the module
        },
        
        /**
         * @inkline/config
         * @description provides configuration file specific options
         */
         
        configFile: resolve(process.cwd(), 'inkline.config.ts'),
        outputDir: resolve(__dirname, 'src/css/variables'),
        extName: '.scss',
        
        /**
         * @inkline/inkline
         * @description provides configuration file specific options
         */
         
        globals: {
            colorMode: 'system',            // Default color mode: 'system' | 'light' | 'dark' | string
            locale: 'en',                   // Default translation
            validateOn: ['input', 'blur'],  // Default validation events
            color: ''                       // Default color variant
            size: '',                       // Default size variant
            componentOptions: {}            // Component specific global overrides
        } 
    }
});
~~~

## License
ISC
