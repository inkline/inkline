---
title: Form Validation
description: Inkline provides you with powerful form validation utilities. 
---

# Form Validation
## Inkline provides you with powerful form validation utilities. 

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

<i-code title="Form Example">
<i-tab type="preview">
    <i-form v-model="form" @submit="submitForm">
        <i-form-group>
            <i-form-label>Project Title</i-form-label>
            <i-input :schema="form.title" placeholder="Enter a project title.." />
        </i-form-group>
        <i-form-group>
            <i-form-label>Project Description</i-form-label>
            <i-textarea :schema="form.description" placeholder="Write a project description.." />
        </i-form-group>
        <i-form-group>
            <i-form-group>
                <i-form-label>Project Type</i-form-label>
                <i-select :schema="form.details.type" placeholder="Choose an option">
                    <i-select-option value="a" label="Admin Dashboard" />
                    <i-select-option value="b" label="eCommerce" />
                    <i-select-option value="c" label="Portfolio" />
                    <i-select-option value="d" label="Blog" disabled />
                </i-select>
            </i-form-group>
            <i-form-group>
                <i-form-label>Project Labels</i-form-label>
                <i-checkbox-group :schema="form.details.labels">
                    <i-checkbox value="Design">Design</i-checkbox>
                    <i-checkbox value="Development">Development</i-checkbox>
                    <i-checkbox value="Testing" disabled>Testing</i-checkbox>
                </i-checkbox-group>
            </i-form-group>
            <i-form-group>
                <i-form-label>Publish</i-form-label>
                <i-radio-group :schema="form.details.published">
                    <i-radio :value="true">Published</i-radio>
                    <i-radio :value="false">Unpublished</i-radio>
                </i-radio-group>
            </i-form-group>
        </i-form-group>
        <i-form-group>
            <i-button type="submit">Create Project</i-button>
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

~~~html
<i-form v-model="form" @submit="submitForm">
    <i-form-group>
        <i-form-label>Project Title</i-form-label>
        <i-input :schema="form.title" placeholder="Enter a project title.." />
    </i-form-group>
    <i-form-group>
        <i-form-label>Project Description</i-form-label>
        <i-textarea :schema="form.description" placeholder="Write a project description.." />
    </i-form-group>
    <i-form-group>
        <i-form-group>
            <i-form-label>Project Type</i-form-label>
            <i-select :schema="form.details.type" placeholder="Choose a project type">
                <i-select-option value="a" label="Admin Dashboard" />
                <i-select-option value="b" label="eCommerce" />
                <i-select-option value="c" label="Portfolio" />
                <i-select-option value="d" label="Blog" disabled />
            </i-select>
        </i-form-group>
        <i-form-group>
            <i-form-label>Project Labels</i-form-label>
            <i-checkbox-group :schema="form.details.labels">
                <i-checkbox value="Design">Design</i-checkbox>
                <i-checkbox value="Development">Development</i-checkbox>
                <i-checkbox value="Testing" disabled>Testing</i-checkbox>
            </i-checkbox-group>
        </i-form-group>
        <i-form-group>
            <i-form-label>Publish</i-form-label>
            <i-radio-group :schema="form.details.published">
                <i-radio :value="true">Published</i-radio>
                <i-radio :value="false">Unpublished</i-radio>
            </i-radio-group>
        </i-form-group>
    </i-form-group>
    <i-form-group>
        <i-button type="submit">Create Project</i-button>
    </i-form-group>
</i-form>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
                name: {
                    validators: [
                        { rule: 'required', message: 'The project name cannot be empty.' }
                    ]
                },
                description: {
                    validators: [
                        { rule: 'required', message: 'The project description is required.' }
                    ]
                },
                details: {
                    title: {
                        validators: [
                            { rule: 'required', message: 'Please provide a project title.' }
                        ]
                    },
                    description: {
                        validators: [
                            { rule: 'required', message: 'Please write a project description.' }
                        ]
                    },
                    details: {
                        type: {
                            value: 'a',
                            validators: [
                                { rule: 'required', message: 'The project type is required.' }
                            ]
                        },
                        labels: {
                            value: ['Design', 'Testing'],
                            validators: [
                                { rule: 'minLength', value: 2, message: 'At least two labels are required.' }
                            ]
                        },
                        published: {
                            value: true,
                            validators: [
                                { rule: 'required', message: 'Publishing is required.', invalidateFalse: true }
                            ]
                        }
                    }
                }
            })
        };
    }
}
~~~

</i-tab>
<i-tab type="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ form | prettify }}
</code>
</pre>
</i-tab>
</i-code>
