# Inkline - Nuxt Module

Get the best out of your [Nuxt.js](https://github.com/nuxt/nuxt.js) application using the [Inkline](https://github.com/inkline/inkline) UI/UX Framework Module.

## Installation

If you haven't created a project yet, generate a project using Nuxt:
```
npx nuxt-create-app my-app
cd my-app
```

Next, add Inkline. Before installing the Inkline plugin, make sure to commit or stash your changes in case you need to revert.
```
npm install --save-dev @inkline/nuxt
```

### Basic Usage
Next, add `@inkline/nuxt` to the modules section of your `nuxt.config.js`. This provides the precompiled CSS and JS by default.

```js
module.exports = {
    modules: [ '@inkline/nuxt' ]
}
```

### Configuration
Optionally, you can configure your Inkline Nuxt.js Module using the following configuration options:
 
```js
module.exports = {
    modules: [ '@inkline/nuxt' ],
    inkline: {
        treeShaking: true,
        scss: true
    }
}
```

Inkline uses Sass, so you will need to install it as a dependency:

`npm install -D node-sass sass-loader`

### Tree Shaking
You can explicitly import only specific components from Inkline adding them to the `components` option.

```js
module.exports = {
    modules: [ '@inkline/nuxt' ],
    inkline: {
        treeShaking: true,
        scss: true,
        components: [ 'IButton', 'IForm', 'IInput' ]
    }
}
```
