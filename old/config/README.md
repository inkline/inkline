<p align="center">
    <a href="https://inkline.io/">
        <img src="https://www.inkline.io/assets/images/logo/logo-black.svg" alt="Inkline" width=72 height=72>
    </a>
</p>

<h1 align="center">@inkline/config</h1>

<p align="center">
    Generate Design System variables for Inkline using a configuration file with sensible defaults.
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
    <a href="https://www.npmjs.com/package/@inkline/config">
        <img src="https://img.shields.io/npm/v/@inkline/config.svg" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/@inkline/config">
        <img src="https://img.shields.io/npm/dm/@inkline/config.svg" alt="Downloads">
    </a>
    <a href="https://chat.inkline.io">
        <img src="https://img.shields.io/discord/550436704482492429.svg" alt="Discord">
    </a>
</p>

## Table of contents

-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Usage](#usage)
-   [Bugs and feature requests](#bugs-and-feature-requests)
-   [Contributing](#contributing)
-   [Community](#community)
-   [Releases](#releases)
-   [Versioning](#versioning)
-   [Creator](#creator)
-   [Copyright and license](#copyright-and-license)


## Installation

1. First, install the package:

~~~bash
npm i -S @inkline/config
~~~

2. Create an `inkline.config.ts` file and override the default configuration as needed:

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

## Usage

The easiest and fastest way to use the configuration would be:
- using the [@inkline/plugin](https://github.com/inkline/plugin) integration package for Vite.js, Webpack.js, or Nuxt.js 
- using the [@inkline/cli](https://github.com/inkline/cli) package


### Programmatic usage

⚠️ **Note**: This package is bundled as part of other `@inkline` packages. You will likely never need to build it programatically.

~~~ts
import { build, getResolvedBuildOptions, UserOptions } from '@inkline/config';

export async function generate(options: UserOptions) {
    const { configFile, outputDir, extName } = getResolvedBuildOptions(options);

    await build({ configFile, outputDir, extName });
}

(async () => {
    await generate({
        configFile: './inkline.config.ts',
        outputDir: './src/css/variables',
    });
})();
~~~

## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/inkline/inkline/issues/new).

## Community

Get updates on Inkline's development and chat with the project maintainers and community members.

-   Follow [@inkline on Twitter](https://twitter.com/inkline).
-   Join [Inkline on Discord](https://chat.inkline.io).
-   Developers should use the keyword `inkline` on packages which modify or add to the functionality of Inkline when distributing through [npm](https://www.npmjs.com/browse/keyword/inkline) or similar delivery mechanisms for maximum discoverability.

## Releases

[Previous releases](https://github.com/inkline/config/releases) and their documentation are also available for download.

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
Code copyright 2022-Present [Inkline Plugin Authors](https://github.com/inkline/config/graphs/contributors). Code released under the [ISC License](https://github.com/inkline/config/blob/main/LICENSE).
