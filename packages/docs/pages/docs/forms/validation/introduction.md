# Form Validation
## Inkline provides you with powerful form validation utilities. { .lead }

The built-in Form Validation package allows you to define a form validation schema which you will bind to your form components. 

Using this declarative approach has several advantages and allows for easy and intuitive form validation:
- centralized form validation schema
- programmatically customizable and extendable
- schema nesting and nested form validation
- built-in validation status propagation
- clean template markup

### Form Prototype

The form prototype will be accessible as `this.$inkline.form` inside components and will be used to create the foundation for form validation schemas.

~~~js
export default {
    name: 'MyComponent',
    data() {
        const formSchema = {
            input: {}
        };

        return {
            form: this.$inkline.form(formSchema)
        };   
    }       
}       
~~~

The `$inkline.form()` method call will bootstrap the `formSchema` object, so that it can be bound to Inkline Form components. This is done using the `schema` property and `v-model` directive. 

Each property inside the schema should have a corresponding form input in your template, such as the `form.input` above:

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="Enter your first name.." />
    </i-form-group>
</i-form>
~~~

For the example above, `this.form.input` would be an object containing the field value, field errors and field statuses.

### Field Statuses

Behind the scenes, the validation utility will validate values using the set of rules you define, handle the displaying of error messages and provide you with useful `valid`, `invalid`, `touched`, `untouched`, `dirty` and `pristine` statuses. 

These fields will be set to `true` when:

- `valid` - the input value is correct
- `invalid` - the input value is not correct
- `touched` - the input has been touched and blurred
- `untouched` - the input has not been touched
- `dirty` - the input value has been changed
- `pristine` - the input has not been changed

To learn more about defining a form schema, head to the <nuxt-link :to="{ name: 'docs-forms-validation-schema' }">next page</nuxt-link>.
