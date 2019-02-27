<p align="center">
    <a href="http://inkline.io/">
        <img src="https://raw.githubusercontent.com/inkline/inkline.io/master/static/images/logo.png" alt="Inkline logo" width=72 height=72>
    </a>
</p>

<h1 align="center">Inkline</h1> 

<p align="center">
    Inkline is a modern UI/UX framework designed for creating flawless responsive websites. Inkline is 
    written and maintained by <a href="https://twitter.com/alexgrozav">@alexgrozav</a>. 
    <br/>
    <br/>
    <a href="http://inkline.io">Documentation</a>
    ·
    <a href="https://github.com/inkline/inkline/issues">Issue Tracker</a>
    ·
    <a href="http://inkline.io/themes">Themes</a>
</p>

<br/>
  
<p align="center">
    <a href="https://www.npmjs.com/package/@inkline/inkline">
        <img src="https://img.shields.io/npm/v/@inkline/inkline.svg" alt="npm version">
    </a>
    <a href="https://travis-ci.org/inkline/inkline">
        <img src="https://travis-ci.org/inkline/inkline.svg?branch=master" alt="Build">
    </a>    
    <a href='https://coveralls.io/github/inkline/inkline?branch=master'><img src='https://coveralls.io/repos/github/inkline/inkline/badge.svg?branch=master' alt='Coverage Status' /></a>
    <img src="https://img.shields.io/david/inkline/inkline.svg?style=popout" alt="dependencies status">
    <a href="https://www.npmjs.com/package/@inkline/inkline">
        <img src="https://img.shields.io/npm/dm/@inkline/inkline.svg" alt="Downloads">
    </a>
    <a href="https://discordapp.com/channels/550436704482492429/550436704968900611">
        <img src="https://img.shields.io/discord/550436704482492429.svg" alt="Discord">
    </a>
</a>

<br/>
<br/>

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Community](#community)
- [Project Completion](#project-completion)
- [Previous releases](#previous-releases)
- [Versioning](#versioning)
- [Creators](#creators)
- [Copyright and license](#copyright-and-license)

## Installation
Read the [Getting started page](https://inkline.io/docs/introduction/getting-started/) for information on the framework contents, templates, examples, and more.

- Install with [npm](https://www.npmjs.com): 
~~~
npm install --save @inkline/inkline
~~~
- Install with [yarn](https://yarnpkg.com/en/):
~~~
yarn add @inkline/inkline
~~~

## Usage
First, import core styles, written in Stylus:

~~~js
import '@inkline/inkline/index.styl';
~~~

If you already have your Webpack configuration ready for Vue, importing the framework is as simple as:

~~~js
import Vue from 'vue';
import Inkline from '@inkline/inkline';

Vue.use(Inkline);
~~~

Alternatively, you can import components individually:

~~~js
import { IButton } from '@inkline/inkline';

Vue.component(IButton.name, IButton);
~~~

## Bugs and feature requests
Have a bug or a feature request? Please first search for existing and closed issues. 
If your problem or idea is not addressed yet, [please open a new issue](https://github.com/inkline/inkline/issues/new).

## Contributing
Please read through our [contributing guidelines](https://github.com/inkline/inkline/blob/master/.github/contributing.md). 
Included are directions for opening issues, coding standards, and notes on development.

## Community
Get updates on Inkline's development and chat with the project maintainers and community members.
- Follow [@inklineUX on Twitter](https://twitter.com/inklineUX).
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

## Copyright and license
Code copyright 2017-2018 [Inkline Authors](https://github.com/inkline/inkline/graphs/contributors).
Code released under the [MIT License](https://github.com/inkline/inkline/blob/master/LICENSE). 
