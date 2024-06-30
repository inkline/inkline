<p align="center">
    <a href="http://inkline.io/">
        <img src="https://raw.githubusercontent.com/inkline/inkline.io/main/assets/images/logo/logo-black.svg" alt="Inkline logo" width=72 height=72>
    </a>
</p>

<h1 align="center">@inkline/unocss</h1>

<p align="center">
    UnoCSS Atomic CSS Utility Classes generator Preset by <a href="https://github.com/alexgrozav">@alexgrozav</a>.
    <br/>
    <br/>
    <a href="https://inkline.io">Homepage</a>
    ·
    <a href="https://inkline.io/docs/introduction">Documentation</a>
    ·
    <a href="https://storybook.inkline.io/">Storybook</a>
    ·
    <a href="https://stackblitz.com/edit/inkline?file=src/App.vue">Playground</a>
    ·
    <a href="https://github.com/inkline/inkline/issues">Issue Tracker</a>
</p>

<br/>

<p align="center">
    <a href="https://www.npmjs.com/package/@inkline/inkline">
        <img src="https://img.shields.io/npm/v/@inkline/unocss.svg" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/@inkline/inkline">
        <img src="https://img.shields.io/npm/dm/@inkline/unocss.svg" alt="Downloads">
    </a>
    <a href="https://chat.inkline.io">
        <img src="https://img.shields.io/discord/550436704482492429.svg" alt="Discord">
    </a>
</p>

<br/>
<br/>

## Installation

1. Install dependencies.

~~~bash
npm i -D unocss @inkline/unocss
~~~

2. Add the Inkline Unocss to your Vite.js configuration.

~~~ts
import { defineConfig } from 'vite';
import { inkline } from '@inkline/plugin/vite';
import { resolve } from 'path';
import unocss from '@unocss/vite';
import { presetInkline, UserOptions } from '@inkline/unocss';

const inklineConfig: UserOptions = {
    outputDir: resolve(__dirname, 'src/css/config')
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        inkline(inklineConfig),
        unocss({
            presets: [presetInkline(inklineConfig)]
        })
    ]
});
~~~

3. Replace the existing `utilities.scss` import with the `virtual:uno.css` import in your `main.ts` file:

```ts
- import '@inkline/inkline/css/utilities.scss?inline';
+ import 'virtual:uno.css';
```

4. Enjoy!


## Creator

### Alex Grozav

-   <https://grozav.com>
-   <https://twitter.com/alexgrozav>
-   <https://facebook.com/alexgrozav>
-   <https://github.com/alexgrozav>

If you use Inkline in your daily work and feel that it has made your life easier, please consider sponsoring me on [Github Sponsors](https://github.com/sponsors/alexgrozav). 💖

## Copyright and license

Released under [MIT License](https://github.com/inkline/unocss/blob/main/packages/docs/LICENSE).

