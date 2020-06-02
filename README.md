<p align="center">
    <a href="https://inkline.io/">
        <img src="https://raw.githubusercontent.com/inkline/inkline/master/packages/docs/static/images/logo.png" alt="Inkline logo" width=72 height=72>
    </a>
</p>

<h1 align="center">Inkline</h1> 

<p align="center">
    Inkline is a modern UI/UX framework designed for creating flawless responsive websites. Inkline is 
    written and maintained by <a href="https://twitter.com/alexgrozav">@alexgrozav</a>. 
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
    <a href="https://www.npmjs.com/package/@inkline/inkline">
        <img src="https://img.shields.io/npm/v/@inkline/inkline.svg" alt="npm version">
    </a>
    <a href="https://github.com/inkline/inkline/actions">
        <img src="https://github.com/inkline/inkline/workflows/Build/badge.svg" alt="Build">
    </a>    
    <a href='https://coveralls.io/github/inkline/inkline?branch=master'><img src='https://coveralls.io/repos/github/inkline/inkline/badge.svg?branch=master' alt='Coverage Status' /></a>
    <a href="https://www.npmjs.com/package/@inkline/inkline">
        <img src="https://img.shields.io/npm/dm/@inkline/inkline.svg" alt="Downloads">
    </a>
    <a href="https://discord.gg/2w5UGnK">
        <img src="https://img.shields.io/discord/550436704482492429.svg" alt="Discord">
    </a>
</a>

<br/>
<br/>

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [CDN](#cdn)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Community](#community)
- [Releases](#releases)
- [Versioning](#versioning)
- [Creators](#creators)
- [Copyright and license](#copyright-and-license)

## Installation
Read the [Getting started page](https://inkline.io/docs/introduction/getting-started/) for information on the framework contents, templates, examples, and more.

- Install with [npm](https://www.npmjs.com/package/@inkline/inkline): 
~~~
npm install --save @inkline/inkline
~~~
- Install with [yarn](https://yarnpkg.com/en/package/@inkline/inkline):
~~~
yarn add @inkline/inkline
~~~
- Install with [composer](https://packagist.org/packages/inkline/inkline):
~~~
composer require inkline/inkline
~~~
- Install with [@vue/cli](https://cli.vuejs.org):
~~~
vue add @inkline/inkline
~~~

## Usage
First, we'll import the core styles, after which we import and register the script files. If you already have your Webpack configuration ready for Vue, importing the framework is as simple as:

~~~js
import Vue from 'vue';
import '@inkline/inkline/dist/inkline.css';
import Inkline from '@inkline/inkline';

Vue.use(Inkline);
~~~

For detailed usage options, refer to the following: 
- [Vue CLI](https://inkline.io/docs/introduction/installation#vue-cli)
- [Nuxt.js Module](https://inkline.io/docs/introduction/installation#nuxt-js-module)

Next, start using the many components that Inkline has to offer. [Read the documentation](https://inkline.io/docs/preface/about-inkline).

## CDN

If you're not using using package managers and build systems and you want to add Inkline to your project, you can import the compiled files from CDN:

~~~html
<link href="https://cdn.jsdelivr.net/npm/@inkline/inkline/dist/inkline.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@inkline/inkline/dist/inkline.js"></script>
~~~

You can also try it out live on <a href="https://jsfiddle.net/alexgrozav/0dknfs6L/" rel="nofollow">JSFiddle</a>.

## Bugs and feature requests
Have a bug or a feature request? Please first search for existing and closed issues. 
If your problem or idea is not addressed yet, [please open a new issue](https://github.com/inkline/inkline/issues/new).

## Community
Get updates on Inkline's development and chat with the project maintainers and community members.
- Follow [@inkline on Twitter](https://twitter.com/inkline).
- Join [Inkline on Discord](https://discord.com/invite/2w5UGnK).
- Developers should use the keyword `inkline` on packages which modify or add to the functionality of Inkline when distributing through [npm](https://www.npmjs.com/browse/keyword/inkline) or similar delivery mechanisms for maximum discoverability.

## Releases
[Previous releases](https://github.com/inkline/inkline/releases) and their documentation are also available for download.

## Versioning
For increased transparency and backward compatibility, 
Inkline is maintained under [the Semantic Versioning guidelines](https://semver.org/). 

## Creator
**Alex Grozav**

- <https://twitter.com/alexgrozav>
- <https://facebook.com/alexgrozav>
- <https://github.com/alexgrozav>

## Contributing
Please read through our [contributing guidelines](https://github.com/inkline/inkline/blob/master/.github/contributing.md). 
There you can find directions for opening issues, feature requests, coding standards, and how to setup a local development environment.

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/alexgrozav"><img class="avatar" src="https://avatars3.githubusercontent.com/u/6179477?v=4" width="50px;" alt="Alex Grozav"/></a></td>
    <td align="center"><a href="https://github.com/mtancoigne"><img class="avatar" src="https://avatars3.githubusercontent.com/u/1732268?v=4" width="50px;" alt="Manuel Tancoigne"/></a></td>
    <td align="center"><a href="https://github.com/renielDev"><img class="avatar" src="https://avatars1.githubusercontent.com/u/14147493?v=4" width="50px;" alt="Reniel Salvador"/></a></td>
    <td align="center"><a href="http://TheJaredWilcurt.com"><img class="avatar" src="https://avatars1.githubusercontent.com/u/4629794?v=4" width="50px;" alt="The Jared Wilcurt"/></a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## Copyright and license
Code copyright 2017-2020 [Inkline Authors](https://github.com/inkline/inkline/graphs/contributors).
Code released under the [MIT License](https://github.com/inkline/inkline/blob/master/LICENSE). 
