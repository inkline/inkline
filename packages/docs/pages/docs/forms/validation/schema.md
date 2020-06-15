# Form Schema
## The form validation schema defines the form input fields, groups and how they work together. {.lead}

### Schema Example
The `<i-form>` component and all input components have a `schema` property that can be used to provide form schema validation. From the <nuxt-link :to="{ name: 'docs-forms-validation-schema' }">Introduction</nuxt-link> page we've learned:

- The schema object provides form validation status fields such as `valid`, `invalid`, `touched`, `untouched`, `dirty`, `pristine` and `errors`. 
- The `<i-form>` component needs to receive the `form` object as a `schema`
- Each child input needs to receive the `form.inputName` as a `schema` and `form.inputName.value` as a `v-model` 

Using the `validators` field, you can specify an array of validators to be used on the input.

<i-code-preview title="Form Schema Example">
<i-form v-model="basicForm">
    <i-form-group>
        <i-input :schema="basicForm.input" placeholder="Enter your first name.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="Enter your first name.." />
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
                    value: 'John Doe',
                    validators: [
                        { rule: 'required' }
                    ]
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<pre>
<code>
<span class="_text-muted">// console.log(this.form);</span>
{{ basicForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>

<i-alert variant="info" class="-code"><template slot="icon"><i class="inkline-icon -info h3"></i></template>The following keywords are reserved for validation purpopses and cannot be used as field names:<div class="_margin-top-1-2"></div>`name`, `value`, `fields`, `validate`, `validateOn`, `validators`, `invalid`, `valid`, `touch`, `touched`, `untouched`, `dirty`, `pristine`, `set`, `add`, `remove`, `errors`.</i-alert> 

If needed, you can change the reserved validation keywords / field names by updating the <nuxt-link :to="{ name: 'docs-introduction-plugin-options' }">Plugin Options</nuxt-link>.

### Input Default Value
Providing a default value for a schema field can be done using the `value` field as follows:

<i-code-preview title="Form Schema Input Default Value">
<i-form v-model="defaultValueForm">
    <i-form-group>
        <i-input :schema="defaultValueForm.input" placeholder="Enter your first name.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="Enter your first name.." />
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
                    value: 'Default Value'
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
{{ defaultValueForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>


### Input Validation Message
Each validator accepts a custom error message using the `message` field. This allows you to use i18n to display error messages.

<i-code-preview title="Input Validation Message">
<i-form v-model="validateValueForm">
    <i-form-group>
        <i-input :schema="validateValueForm.input" placeholder="Enter your first name.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="Enter your first name.." />
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
                        { rule: 'required', message: 'Input is required' }
                    ]
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
{{ validateValueForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>

### Input Validation Event
By using the `validateOn` field you can specify the event that triggers the validation. The most common events are `input` and `blur`.

<i-code-preview title="Input Validation Events">
<i-form v-model="validateOnForm">
    <i-form-group>
        <i-input :schema="validateOnForm.input1" placeholder="This field is validated on input" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="validateOnForm.input2" placeholder="This field is validated on blur" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input1" placeholder="This field is validated on input" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.input2" placeholder="This field is validated on blur" />
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
                input1: {
                    validateOn: 'input',
                    validators: [
                        { rule: 'minLength', value: 6 }
                    ]
                },
                input2: {
                    validateOn: 'blur',
                    validators: [
                        { rule: 'minLength', value: 6 }
                    ]
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
{{ validateOnForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>

### Schema Groups

You can define schema groups to determine the validation of a group of inputs.

##### Object Form Groups
Objects that aren't empty and don't have a `value` or `validators` field are treated as form groups. Form groups can be used to see the validation status of specific fields.

<i-code-preview title="Form Schema Form Groups">
<i-form v-model="groupedValueForm">
    <i-form-group>
        <i-input :schema="groupedValueForm.input" placeholder="Enter your first name.." />
    </i-form-group>
    <i-form-group>
        <i-input :schema="groupedValueForm.group.input" placeholder="Enter your address.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="Enter your first name.." />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.group.input" placeholder="Enter your address.." />
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
                input: {},
                group: {
                    input: {}
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
{{ groupedValueForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>

##### Array Form Groups
Form groups can be an `Array` of fields, allowing you to loop over them using `v-for`.

<i-code-preview title="Form Schema Array Form Groups">
<i-form v-model="arrayValueForm">
    <i-form-group v-for="field in arrayValueForm.group" :key="field.name">
        <i-input :schema="field" placeholder="Type something.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group v-for="field in form.group" :key="field.name">
        <i-input :schema="field" placeholder="Type something.." />
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
                group: [
                    { value: 'First Field' },
                    { value: 'Second Field' }
                ]
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
{{ arrayValueForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>

### Complete Form Example

The `<i-form>` component and all input components have a `schema` property that can be used to provide form schema validation. The schema object provides form validation status fields such as `valid`, `invalid`, `touched`, `untouched`, `dirty`, `pristine` and `errors`.

The schema object `this.form` contains the validation state of the `<i-form>`, and is updated as soon as the input changes. The object looks as seen in the Output tab: 

<i-code-preview title="Complete Form Example">
<i-form v-model="form" @submit="submitForm">
    <i-form-group>
        <i-form-label>Input</i-form-label>
        <i-input :schema="form.input" placeholder="Enter your first name.." />
    </i-form-group>
    <i-form-group>
        <i-form-label>Textarea</i-form-label>
        <i-textarea :schema="form.textarea" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group>
        <i-form-group>
            <i-form-label>Select</i-form-label>
            <i-select :schema="form.group.select" placeholder="Choose an option">
                <i-select-option value="a" label="Option A" />
                <i-select-option value="b" label="Option B" />
                <i-select-option value="c" label="Option C" disabled />
            </i-select>
        </i-form-group>
        <i-form-group>
            <i-form-label>Boolean</i-form-label><br />
            <i-checkbox :schema="form.group.checked">I agree</i-checkbox>
        </i-form-group>
        <i-form-group>
            <i-form-label>Checkbox</i-form-label>
            <i-checkbox-group :schema="form.group.checkbox">
                <i-checkbox value="Football">Football</i-checkbox>
                <i-checkbox value="Volleyball">Volleyball</i-checkbox>
                <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
            </i-checkbox-group>
        </i-form-group>
        <i-form-group>
            <i-form-label>Radio</i-form-label>
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
        <i-form-label>Input</i-form-label>
        <i-input :schema="form.input" placeholder="Enter your first name.." />
    </i-form-group>
    
    <i-form-group>
        <i-form-label>Textarea</i-form-label>
        <i-textarea :schema="form.textarea" placeholder="Write a comment.." />
    </i-form-group>
    
    <i-form-group>
        <i-form-group>
            <i-form-label>Select</i-form-label>
            <i-select :schema="form.group.select" placeholder="Choose an option">
                <i-select-option value="a" label="Option A" />
                <i-select-option value="b" label="Option B" />
                <i-select-option value="c" label="Option C" disabled />
            </i-select>
        </i-form-group>

        <i-form-group>
            <i-form-label>Boolean</i-form-label><br />
            <i-checkbox :schema="form.group.checked">I agree</i-checkbox>
        </i-form-group>

        <i-form-group>
            <i-form-label>Checkbox</i-form-label>
            <i-checkbox-group :schema="form.group.checkbox">
                <i-checkbox value="Football">Football</i-checkbox>
                <i-checkbox value="Volleyball">Volleyball</i-checkbox>
                <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
            </i-checkbox-group>
        </i-form-group>

        <i-form-group>
            <i-form-label>Radio</i-form-label>
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
                    checked: {
                        value: true,
                        validators: [
                            { rule: 'required', message: 'Checkbox is required.', invalidateFalse: true }
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
