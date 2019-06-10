# Form Validation
## Inkline provides you with powerful form validation utilities. { .lead }

The Form Validation package allows you to define a form schema which you will bind to your form components. 

Behind the scenes, the validation utility will validate values using the set of rules you define, handle the displaying of error messages and provide you with useful `valid`, `invalid`, `touched`, `untouched`, `dirty` and `pristine` statuses.

### Usage

The validation package comes alongside Inkline, but it is opt-in by default. To add it, simply import and use the validation script:

~~~js
import Vue from 'vue';
import InklineValidation from '@inkline/inkline/dist/validation';

Vue.use(InklineValidation);
~~~

This will make `Vue.prototype.$form` available, which will be used to create form schemas readable by Inkline's form components. The form prototype will be accessible as `this.$form` inside components and will be used to create the foundation for form validation schemas.

### CDN

If you're not using using package managers and build systems and you want to add Inkline Validation to your project, you can import the compiled files from CDN:

~~~html
<script src="https://cdn.jsdelivr.net/npm/@inkline/inkline/dist/validation.js"></script>
~~~
