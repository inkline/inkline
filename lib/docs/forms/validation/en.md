---
title: Form Validation
description: Inkline provides you with powerful form validation utilities. 
---

<script setup>
import * as examples from './examples';
</script>

# Form Validation
## Inkline provides you with powerful form validation utilities. 

The built-in Form Validation package allows you to define a form validation schema which you will bind to your form components. 

Using this declarative approach has several advantages and allows for easy and intuitive form validation:
- centralized form validation schema
- programmatically customizable and extendable
- schema nesting and nested form validation
- built-in validation status propagation
- clean template markup

### Basic Example
Let's create a basic login form that has a `username` and a `password` field. Validation for this kind of form is usually a headache, but Inkline makes it simple for you. Basic validation for these fields usually includes:
- The username is required
- The password is required
- The password is at least 8 characters long
- The password contains at least one uppercase character
- The password contains at least one lowercase character 
- The password contains at least one numeric character 
- The password contains at least one symbol

#### 1. Defining the form schema
First, we'll create our schema with two fields: `username` and `password`. The form validation schema prototype is available for both the Options API and the new Composition API. Choose the one that you prefer. 

##### a. Options API
The form schema prototype will created using `this.$inkline.form` inside components and will be used as the foundation for form validation schemas.

~~~js
export default {
    data() {
        const schema = {
            username: {},
            password: {},
        };

        return {
            form: this.$inkline.form(schema)
        };   
    }       
}       
~~~
 
##### b. Composition API 

The form schema prototype is created using the `useForm` utility inside components and will be used as the foundation for form validation schemas.

~~~js
import { useForm } from '@inkline/inkline/src/composition-api';

export default {
    setup() {
        const schema = {
            username: {},
            password: {},
        };
        const form = useForm(schema);

        return {
            form
        };   
    }       
}       
~~~

#### 2. Connecting the schema to the form components

Next, the created `form` object needs to be bound to the form input components inside your template as follows:
 - The form component handles field value changes using the `v-model` directive
 - Each field name inside the defined schema connects to an input using the `name` property in your template

<example :component="examples.IFormValidationBasicBindingExample" :html="examples.IFormValidationBasicBindingExampleHTML" :js="examples.IFormValidationBasicBindingExampleJS"></example>

For the example above, `this.form.username` and `this.form.password` would be objects containing the field value, errors and validation statuses.

#### 3. Adding the field validators

Next, let's add the previously mentioned validators to the created form schema:

~~~js
export default {
    data() {
        const schema = {
            username: {
                validators: [
                    { 
                        name: 'required' 
                    }
                ]
            },
            password: {
                validators: [
                    { 
                        name: 'required' 
                    },
                    { 
                        name: 'minLength', 
                        value: 8 
                    },
                    {
                        name: 'custom', // lowercase
                        message: 'Please enter at least one lowercase character.',
                        validator: (v) => /[a-z]/.test(v)
                    },
                    {
                        name: 'custom', // uppercase
                        message: 'Please enter at least one uppercase character.',
                        validator: (v) => /[A-Z]/.test(v)
                    },
                    {
                        name: 'custom', // numeric
                        message: 'Please enter at least one numeric character.',
                        validator: (v) => /[0-9]/.test(v)
                    },
                    {
                        name: 'custom', // symbol
                        message: 'Please enter at least one symbol.',
                        validator: (v) => /[^a-zA-Z0-9]/.test(v)
                    }
                ]
            }
        };

        return {
            form: this.$inkline.form(schema)
        };   
    }       
}       
~~~

<example :component="examples.IFormValidationBasicValidatorsExample" :html="examples.IFormValidationBasicValidatorsExampleHTML" :js="examples.IFormValidationBasicValidatorsExampleJS"></example>

You can also register custom validators for your form schema.

### Validation Statuses
Did you see how simple that was? Makes writing form validation a breeze. Behind the scenes, the validation utility will validate values using the set of rules you define, handle the displaying of error messages and provide you with useful `valid`, `invalid`, `touched`, `untouched`, `dirty` and `pristine` statuses. 

These fields will be set to `true` when:

- `valid` - the input value is correct
- `invalid` - the input value is not correct
- `touched` - the input has been touched and blurred
- `untouched` - the input has not been touched
- `dirty` - the input value has been changed
- `pristine` - the input value has not been changed

To learn more about defining a form schema, head to the next page.
