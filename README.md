# [Inkline](http://inkline.io)
![Bower version](https://img.shields.io/bower/v/inkline.svg)
[![npm version](https://img.shields.io/npm/v/inkline.svg)](https://www.npmjs.com/package/inkline)
[![devDependency Status](https://img.shields.io/david/dev/inkline/inkline.svg)](https://david-dm.org/inkline/inkline?type=dev)
[![Meteor Atmosphere](https://img.shields.io/badge/meteor-inkline%3Ainkline-blue.svg)](https://atmospherejs.com/inkline/inkline)
[![Coveralls](https://img.shields.io/coveralls/inkline/inkline.svg)](https://coveralls.io/github/inkline/inkline)
<!-- [![Packagist Prerelease](https://img.shields.io/packagist/dt/inkline/inkline.svg)](https://packagist.org/packages/inkline/inkline) -->
<!-- [![Gem version](https://img.shields.io/gem/v/inkline.svg)](https://rubygems.org/gems/inkline) -->

Inkline is a UI/UX framework designed for creating flawless responsive websites, using Gradient Design. Inkline is 
written and maintained by [@alexgrozav](https://twitter.com/alexgrozav).

To get started, check out <http://inkline.io>!

## Table of contents

- [Quick start](#quick-start)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Community](#community)
- [Versioning](#versioning)
- [Creators](#creators)
- [Copyright and license](#copyright-and-license)

## Quick start

Read the [Getting started page](https://inkline.io/docs/getting-started/) for information on the framework contents, templates, examples, and more.

- Clone the repo: `git clone https://github.com/inkline/inkline.git`
- Install with [npm](https://www.npmjs.com): `npm install --save inkline`

If you already have your Webpack configuration ready for stylus and Vue, importing the framework is as simple as:

~~~js
import 'inkline/resources/css/index.styl';
import * as Inkline from 'inkline';
import Vue from 'vue';

Vue.use(Inkline);

new Vue({
    el: '#app'
});
~~~

## Contributions, bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://github.com/inkline/inkline/blob/master/CONTRIBUTING.md) 
and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/inkline/inkline/issues/new).

## Previous releases

[Previous releases](https://github.com/inkline/inkline/releases) and their documentation are also available for download.

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
- [ ] Forms
    - [x] Checkbox
    - [ ] Input
    - [ ] Textarea
    - [x] Radio
- [ ] Components
    - [ ] Alerts
    - [ ] Badges
    - [ ] Breadcrumb
    - [ ] Buttons
    - [ ] Button Groups
    - [ ] Card
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
