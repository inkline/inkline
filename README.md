<p align="center">
  <a href="http://inkline.io/">
    <img src="http://inkline.io/" alt="Inkline logo" width=72 height=72>
  </a>

  <h1 align="center">Inkline</h1>
</p>

<p align="center">
  Inkline is a UI/UX framework designed for creating flawless responsive websites, using Gradient Design. Inkline is 
  written and maintained by <a href="https://twitter.com/alexgrozav">@alexgrozav</a>. 
  <br/>

  <br/>
  <br/>
  <a href="http://inkline.io">Documentation</a>
  ·
  <a href="https://github.com/twbs/bootstrap/issues/new?template=bug.md">Report bug</a>
  ·
  <a href="https://github.com/inkline/inkline/issues/new?template=feature.md&labels=feature">Request feature</a>
  ·
  <a href="http://inkline.io/themes">Themes</a>
</p>

<br/>
<br/>

<p align="center">
  <a href="https://www.npmjs.com/package/inkline"><img src="https://img.shields.io/npm/v/inkline.svg" alt="npm version"></a>
  <img src="https://img.shields.io/david/inkline/inkline.svg?style=popout" alt="dependencies status">
  <img src="https://img.shields.io/david/inkline/inkline.svg?style=popout" alt="devDependencies status">
  <a href="https://www.npmjs.com/package/inkline"><img src="https://img.shields.io/npm/dm/inkline.svg" alt="Downloads"></a>
</a>

<br/>
<br/>

## Table of contents

- [Quick start](#quick-start)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Community](#community)
- [Project Completion](#project-completion)
- [Previous releases](#previous-releases)
- [Versioning](#versioning)
- [Creators](#creators)
- [Copyright and license](#copyright-and-license)

## Quick start

Read the [Getting started page](https://inkline.io/docs/getting-started/) for information on the framework contents, templates, examples, and more.

- Clone the repo: `git clone https://github.com/inkline/inkline.git`
- Install with [npm](https://www.npmjs.com): `npm install --save inkline`

If you already have your Webpack configuration ready for stylus and Vue, importing the framework is as simple as:

~~~js
import 'inkline/src/index.styl';
import 'inkline/src/theme/index.styl';

import Vue from 'vue';
import App from './App';
import Inkline from 'inkline';

Vue.use(Inkline);

new Vue({
    el: '#app',
    components: { App },
    template: '<app/>'
});

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


## Project Completion

Here you can see the current progress for Inkline:

- [x] Layout
    - [x] Core
    - [x] Grid
    - [x] Layout
    - [x] Typography
    - [x] Images
    - [x] Tables
    - [x] Code
    - [x] Print
- [x] Forms
    - [x] Checkbox
    - [x] Input
    - [x] Number Input
    - [x] Textarea
    - [x] Radio
- [ ] Components
    - [ ] Alerts
    - [ ] Badges
    - [ ] Breadcrumb
    - [x] Buttons
    - [x] Button Groups
    - [x] Card
    - [ ] Carousel
    - [ ] Collapse
    - [ ] Dropdowns
    - [ ] Input Groups
    - [ ] Header
    - [ ] List Group
    - [ ] Media Object
    - [ ] Modal
    - [ ] Navs
    - [ ] Navbar
    - [ ] Pagination
    - [ ] Popovers
    - [ ] Progress
    - [ ] Scrollspy
    - [ ] Tooltips
- [x] Helpers
    - [x] Align
    - [x] Borders
    - [x] Clearfix
    - [x] Colors
    - [x] Display
    - [x] Embed
    - [x] Flex
    - [x] Float
    - [x] Position
    - [x] Sizing
    - [x] Spacing
    - [x] Text
    - [x] Visibility
    
## Previous releases

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
Code and documentation copyright 2017-2018 [Inkline Authors](https://github.com/inkline/inkline/graphs/contributors).
Code released under the [MIT License](https://github.com/inkline/inkline/blob/master/LICENSE). 
Docs released under [Creative Commons](https://github.com/inkline/inkline.io/blob/master/docs/LICENSE).
