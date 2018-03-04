# [Inkline](http://inkline.io)

### Inkline is currently being created. Updated information and website coming soon.

![Bower version](https://img.shields.io/bower/v/inkline.svg)
[![npm version](https://img.shields.io/npm/v/inkline.svg)](https://www.npmjs.com/package/inkline)
[![devDependency Status](https://img.shields.io/david/dev/inkline/inkline.svg)](https://david-dm.org/inkline/inkline?type=dev)
[![Meteor Atmosphere](https://img.shields.io/badge/meteor-inkline%3Ainkline-blue.svg)](https://atmospherejs.com/inkline/inkline)
[![Coveralls](https://img.shields.io/coveralls/inkline/inkline.svg)](https://coveralls.io/github/inkline/inkline)
<!-- [![Packagist Prerelease](https://img.shields.io/packagist/dt/inkline/inkline.svg)](https://packagist.org/packages/inkline/inkline) -->
<!-- [![Gem version](https://img.shields.io/gem/v/inkline.svg)](https://rubygems.org/gems/inkline) -->

Inkline is a UI/UX framework designed for creating flawless responsive websites, using Gradient Design. Inkline is written and maintained by [@alexgrozav](https://twitter.com/alexgrozav).

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

Several quick start options are available:

- [Download the latest release.](https://github.com/inkline/inkline/archive/v0.0.5.zip)
- Clone the repo: `git clone https://github.com/inkline/inkline.git`
- Install with [npm](https://www.npmjs.com): `npm install inkline`
- Install with [yarn](https://github.com/yarnpkg/yarn): `yarn add inkline`
- Install with [Composer](https://getcomposer.org): `composer require inkline/inkline`
- Install with [Bower](https://bower.io): `bower install inkline`


Read the [Getting started page](https://inkline.io/getting-started/) for information on the framework contents, templates, examples, and more.

### What's included

You'll find the following directories and files inside the download, logically grouping assets and providing source files in `src`, compiled files together with map files in `build` and minified files in `dist`. You'll see something like this:

```
dist/
├── css/
│   ├── inkline.css
│   ├── inkline.css.map
└── js/
    ├── inkline.js
build/
├── css/
│   ├── inkline.css
│   ├── inkline.css.map
└── js/
    ├── inkline.js
src/
├── css/
│   ├── inkline.styl
└── js/
    ├── inkline.ts
```

## Contributions, bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://github.com/inkline/inkline/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/inkline/inkline/issues/new).

## Documentation

Inkline's documentation, included in this repository in the site directory, is built with [Jekyll](https://jekyllrb.com) and publicly hosted on GitHub Pages at <https://inkline.io>. The docs may also be run locally.

### Running locally

1. Run `npm install && npm install -g pug-cli` to install the NPM dependencies required for development.
2. Run `gulp build` (or a specific set of Gulp tasks) to rebuild distributed CSS and JavaScript files, as well as our docs assets.
3. Run through the tooling setup to install Jekyll (the site builder) and other Ruby dependencies with `bundle install` inside of the `site` folder.
4. From the root `/inkline` directory, run `npm start` in the command line.
5. Open <http://localhost:3030> in your browser, and you're set.

Learn more about using Jekyll by reading its [documentation](https://jekyllrb.com/docs/home/).

## Previous releases

[Previous releases](https://github.com/inkline/inkline/releases) and their documentation are also available for download.


## Project Completion

Here you can see the current progress for Inkline:

- [x] Layout
  - [x] Core
  - [x] Grid
  - [x] Print
- [ ] Content
  - [x] Code
  - [x] Images
  - [x] Tables
  - [x] Typography
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
  - [ ] Forms
  - [ ] Input Groups
  - [ ] Header
  - [ ] List Group
  - [x] Media Object
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
