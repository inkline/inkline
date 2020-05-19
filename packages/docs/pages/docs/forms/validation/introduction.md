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
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="Enter your first name.." />
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


### Example

The schema object `this.form` contains the validation state of the `<i-form>`, and is updated as soon as the input changes. The object looks as seen in the Output tab: 

<i-code-preview title="Form Example">
<i-form v-model="form" @submit="submitForm">
    <i-form-group>
        <i-input :schema="form.input" placeholder="Enter your first name.." />
    </i-form-group>
    <i-form-group>
        <i-textarea :schema="form.textarea" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group>
        <i-form-group>
            <i-select :schema="form.group.select" placeholder="Choose an option">
                <i-select-option value="a" label="Option A" />
                <i-select-option value="b" label="Option B" />
                <i-select-option value="c" label="Option C" disabled />
            </i-select>
        </i-form-group>
        <i-form-group>
            <i-checkbox :schema="form.group.checked">I agree</i-checkbox>
        </i-form-group>
        <i-form-group>
            <i-checkbox-group :schema="form.group.checkbox">
                <i-checkbox value="Football">Football</i-checkbox>
                <i-checkbox value="Volleyball">Volleyball</i-checkbox>
                <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
            </i-checkbox-group>
        </i-form-group>
        <i-form-group>
            <i-radio-group :schema="form.group.radio">
                <i-radio :value="true">Accept</i-radio>
                <i-radio :value="false">Decline</i-radio>
            </i-radio-group>
        </i-form-group>
    </i-form-group>
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form" @submit="submitForm">
    <i-form-group>
        <i-input :schema="form.input" placeholder="Enter your first name.." />
    </i-form-group>
    
    <i-form-group>
        <i-textarea :schema="form.textarea" placeholder="Write a comment.." />
    </i-form-group>
    
    <i-form-group>
        <i-form-group>
            <i-select :schema="form.group.select" placeholder="Choose an option">
                <i-select-option value="a" label="Option A" />
                <i-select-option value="b" label="Option B" />
                <i-select-option value="c" label="Option C" disabled />
            </i-select>
        </i-form-group>
        <i-form-group>
            <i-checkbox-group :schema="form.group.checkbox">
                <i-checkbox value="Football">Football</i-checkbox>
                <i-checkbox value="Volleyball">Volleyball</i-checkbox>
                <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
            </i-checkbox-group>
        </i-form-group>
        <i-form-group>
            <i-radio-group :schema="form.group.radio">
                <i-radio :value="true">Accept</i-radio>
                <i-radio :value="false">Decline</i-radio>
            </i-radio-group>
        </i-form-group>
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
                input: {
                    validators: [
                        { rule: 'required', message: 'Input is required.' }
                    ]
                },
                textarea: {
                    validators: [
                        { rule: 'required', message: 'Textarea is required.' }
                    ]
                },
                group: {
                    select: {
                        value: 'a',
                        validators: [
                            { rule: 'required', message: 'Select is required.' }
                        ]
                    },
                    checkbox: {
                        value: ['Football'],
                        validators: [
                            { rule: 'minLength', value: 1, message: 'At least one checkbox is required.' }
                        ]
                    },
                    radio: {
                        value: true,
                        validators: [
                            { rule: 'required', message: 'Radio is required.', invalidateFalse: true }
                        ]
                    }
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ form | prettify }}
</code>
</pre>
</template>
</i-code-preview>
