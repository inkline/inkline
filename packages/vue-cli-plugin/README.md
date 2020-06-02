# Inkline - Vue CLI Plugin

[Vue CLI](https://github.com/vuejs/vue-cli) Plugin for [Inkline](https://github.com/inkline/inkline), the customizable Vue.js UI/UX Library.

## Install

If you haven't yet installed Vue CLI, first follow the install instructions [here](https://github.com/vuejs/vue-cli).

If you haven't created a project yet, generate a project using Vue CLI:

```
vue create my-app
cd my-app
```

Next, add Inkline. Before installing the Inkline plugin, make sure to commit or stash your changes in case you need to revert.

```
vue add @inkline/inkline
```

## Configuration
Optionally, you can configure your Inkline Vue CLI Plugin using the following installation options.

First of all, Inkline uses Sass, so you will need to install it as a dependency:

`npm install -D node-sass sass-loader`

### Tree Shaking and SCSS
To install a tree-shaking and SCSS ready Inkline setup:
```
vue add @inkline/inkline --treeShaking --scss
```

