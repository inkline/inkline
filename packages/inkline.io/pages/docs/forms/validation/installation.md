# Form Validation
Inkline provides you with powerful form validation utilities. { .lead }

### Installation
First, install Inkline Form Validation using your favorite package manager and get access to the latest source code and compiled JavaScript. 

You can install <a href="https://github.com/inkline/validation" target="_blank">Inkline Form Validation</a> using one of the following package managers:

**Install using `npm`:**

~~~css
npm install --save @inkline/validation
~~~

**Install using `yarn`:**

~~~css
yarn add @inkline/validation
~~~

**Install using `composer`:**

~~~css
composer require inkline/validation
~~~

### Usage

Next, we import and register the script files. If you already have your Webpack configuration ready for Vue, importing the framework is as simple as:

~~~js
import Vue from 'vue';
import InklineValidation from '@inkline/validation';

Vue.use(InklineValidation);
~~~

This will make `Vue.prototype.$form` available, which will be used to create form schemas readable by Inkline's form components.

