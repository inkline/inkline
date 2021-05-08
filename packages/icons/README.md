<p align="center">
    <a href="https://inkline.io/">
        <img src="https://raw.githubusercontent.com/inkline/inkline/master/packages/docs/static/images/logo.png" alt="Inkline logo" width=72 height=72>
    </a>
</p>

<h1 align="center">Inkline Icons</h1>

<p align="center">
    Inkline Icons provides you with an awesome, maintainable Universal Vue.js 3 Icon Component with thousands of icons from more than 15 icon packs. Inkline is written and maintained by <a href="https://twitter.com/alexgrozav">@alexgrozav</a>.
    <br/>
    <br/>
    <br/>
    <a href="https://inkline.io">Homepage</a>
    ·
    <a href="https://inkline.io/docs/introduction/getting-started">Documentation</a>
    ·
    <a href="https://github.com/inkline/inkline/issues">Issue Tracker</a>
</p>

<br/>

<p align="center">
    <a href="https://www.npmjs.com/package/@inkline/icons">
        <img src="https://img.shields.io/npm/v/@inkline/icons.svg" alt="npm version">
    </a>
    <a href="https://github.com/inkline/inkline/actions">
        <img src="https://github.com/inkline/inkline/workflows/Build/badge.svg" alt="Build">
    </a>
    <a href='https://coveralls.io/github/inkline/inkline?branch=master'><img src='https://coveralls.io/repos/github/inkline/inkline/badge.svg?branch=master' alt='Coverage Status' /></a>
    <a href="https://www.npmjs.com/package/@inkline/icons">
        <img src="https://img.shields.io/npm/dm/@inkline/icons.svg" alt="Downloads">
    </a>
    <a href="https://discord.gg/2w5UGnK">
        <img src="https://img.shields.io/discord/550436704482492429.svg" alt="Discord">
    </a>
</a>

<br/>
<br/>

## Table of contents
- [Installation](#installation)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Community](#community)
- [Releases](#releases)
- [Versioning](#versioning)
- [Creators](#creators)
- [Copyright and license](#copyright-and-license)

## Installation
Read the [Icon Documentation](https://inkline.io/docs/components/icon) page and find information on how to import and use the icon component.

To install the package standalone:
~~~bash
npm install @inkline/icons
~~~

~~~js
import { createApp } from 'vue';
import { InklineIcons } from '@inkline/icons';
import { faCheck, faHome } from '@inkline/icons/build/packs/fontawesome';
import App from './App.vue';

const app = createApp(App);

app.use(InklineIcons, {
    faCheck,
    faHome
});
~~~

## Bugs and feature requests
Have a bug or a feature request? Please first search for existing and closed issues.
If your problem or idea is not addressed yet, [please open a new issue](https://github.com/inkline/inkline/issues/new).

## Community
Get updates on Inkline's development and chat with the project maintainers and community members.
- Follow [@inkline on Twitter](https://twitter.com/inkline).
- Join [Inkline on Discord](https://discord.com/invite/2w5UGnK).
- Join [Discussions on GitHub](https://github.com/inkline/inkline/discussions).
- Developers should use the keyword `inkline` on packages which modify or add to the functionality of Inkline when distributing through [npm](https://www.npmjs.com/browse/keyword/inkline) or similar delivery mechanisms for maximum discoverability.

## Releases
[Previous releases](https://github.com/inkline/inkline/releases) and their documentation are also available for download.

## Versioning
For increased transparency and backward compatibility,
Inkline is maintained under [the Semantic Versioning guidelines](https://semver.org/).

## Creators
**Alex Grozav**

- <https://twitter.com/alexgrozav>
- <https://facebook.com/alexgrozav>
- <https://github.com/alexgrozav>

## Contributing
Please read through our [contributing guidelines](https://github.com/inkline/inkline/blob/master/.github/CONTRIBUTING.md).
There you can find directions for opening issues, feature requests, coding standards, and how to setup a local development environment.

Thanks goes to [these wonderful people](https://github.com/inkline/inkline#contributing).

## Copyright and license
Code copyright 2017-2021 [Inkline Authors](https://github.com/inkline/inkline/graphs/contributors).
Code released under the [MIT License](https://github.com/inkline/inkline/blob/master/packages/inkline/LICENSE).
