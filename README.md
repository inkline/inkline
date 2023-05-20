<p align="center">
    <a href="https://inkline.io/">
        <img src="https://raw.githubusercontent.com/inkline/inkline.io/main/assets/images/logo/logo-black.svg" alt="Inkline" width=72 height=72>
    </a>
</p>

<h1 align="center">@inkline/plugin</h1>

<p align="center">
    The easiest and fastest way to use Inkline with your favorite development environment. We officially support integrations with <a href="https://nuxt.com">Nuxt.js</a>, <a href="https://vitejs.dev">Vite.js</a>, and <a href="https://webpack.js.org">Webpack.js</a>.
    <br/>
    <br/>
    <br/>
    <a href="https://www.inkline.io">Homepage</a>
    ·
    <a href="https://www.inkline.io/docs/introduction">Documentation</a>
    ·
    <a href="https://storybook.inkline.io/">Storybook</a>
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
            color: '',                         // Default color variant
            colorMode: 'system',               // Default color mode: 'system' | 'light' | 'dark' | string
            colorModeStrategy: 'localStorage', // Default color mode startegy: 'localStorage' | string
            componentOptions: {},              // Component specific global overrides
            locale: 'en',                      // Default translation
            size: '',                          // Default size variant
            validateOn: ['input', 'blur']     // Default validation events
        } 
    }
});
~~~

## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/inkline/inkline/issues/new).

## Community

Get updates on Inkline's development and chat with the project maintainers and community members.

-   Follow [@inkline on Twitter](https://twitter.com/inkline).
-   Join [Inkline on Discord](https://chat.inkline.io).
-   Developers should use the keyword `inkline` on packages which modify or add to the functionality of Inkline when distributing through [npm](https://www.npmjs.com/browse/keyword/inkline) or similar delivery mechanisms for maximum discoverability.

## Releases

[Previous releases](https://github.com/inkline/plugin/releases) and their documentation are also available for download.

## Versioning

For increased transparency and backward compatibility, Inkline is maintained under [the Semantic Versioning guidelines](https://semver.org/).

## Creator

### **Alex Grozav**

-   <https://grozav.com>
-   <https://twitter.com/alexgrozav>
-   <https://facebook.com/alexgrozav>
-   <https://github.com/alexgrozav>

If you use Inkline in your daily work and feel that it has made your life easier, please consider
sponsoring me on [Github Sponsors](https://github.com/sponsors/alexgrozav). 💖

## Contributing

Please read through our [contributing guidelines](https://github.com/inkline/inkline/blob/main/.github/CONTRIBUTING.md). There you can find directions for opening issues, feature requests, coding standards, and how to setup a local development environment.

## Copyright and license
Code copyright 2022-Present [Inkline Plugin Authors](https://github.com/inkline/plugin/graphs/contributors). Code released under the [ISC License](https://github.com/inkline/plugin/blob/main/LICENSE).
