# Form Schema
The form validation schema defines the form input fields, groups and how they work together. {.lead}

### Schema Example
The `<i-form>` component and all input components have a `schema` property that can be used to provide form schema validation. The schema object provides form validation status fields such as `valid`, `invalid`, `touched`, `untouched`, `dirty`, `pristine` and `errors`.

The `<i-form>` component needs to take the form itself as a `schema`. Each input needs to take the `form.inputName` as a schema and `form.inputName.value` as a model. This will ensure that form validation is working properly.

Using the `validators` field, you can specify an array of validators to be used on the input.

<i-code-preview title="Form Schema Example" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js">
<i-form :schema="basicForm">
    <i-form-group>
        <i-input :schema="basicForm.input" v-model="basicForm.input.value" placeholder="Enter your first name.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="Enter your first name.." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
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


### Input Default Value
Providing a default value for a schema field can be done using the `value` field as follows:

<i-code-preview title="Form Schema Input Default Value" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js">
<i-form :schema="defaultValueForm">
    <i-form-group>
        <i-input :schema="defaultValueForm.input" v-model="defaultValueForm.input.value" placeholder="Enter your first name.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="Enter your first name.." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
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

<i-code-preview title="Input Validation Message" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js">
<i-form :schema="validateValueForm">
    <i-form-group>
        <i-input :schema="validateValueForm.input" v-model="validateValueForm.input.value" placeholder="Enter your first name.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="Enter your first name.." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
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

<i-code-preview title="Input Validation Events" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js">
<i-form :schema="validateOnForm">
    <i-form-group>
        <i-input :schema="validateOnForm.input1" v-model="validateOnForm.input1.value" placeholder="This field is validated on input" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="validateOnForm.input2" v-model="validateOnForm.input2.value" placeholder="This field is validated on blur" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input1" v-model="form.input1.value" placeholder="This field is validated on input" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.input2" v-model="form.input2.value" placeholder="This field is validated on blur" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
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

<i-code-preview title="Form Schema Form Groups" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js">
<i-form :schema="groupedValueForm">
    <i-form-group>
        <i-input :schema="groupedValueForm.input" v-model="groupedValueForm.input.value" placeholder="Enter your first name.." />
    </i-form-group>
    <i-form-group>
        <i-input :schema="groupedValueForm.group.input" v-model="groupedValueForm.group.input.value" placeholder="Enter your address.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="Enter your first name.." />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.group.input" v-model="form.group.input.value" placeholder="Enter your address.." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
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

<i-code-preview title="Form Schema Array Form Groups" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js">
<i-form :schema="arrayValueForm">
    <i-form-group v-for="field in arrayValueForm.group" :key="field.name">
        <i-input :schema="field" v-model="field.value" placeholder="Type something.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group v-for="field in form.group" :key="field.name">
        <i-input :schema="field" v-model="field.value" placeholder="Type something.." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
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

<i-code-preview title="Complete Form Example" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js" class="_padding-bottom-0">
<i-form :schema="form" @submit="submitForm">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="Enter your first name.." />
    </i-form-group>
    <i-form-group>
        <i-textarea :schema="form.textarea" v-model="form.textarea.value" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group>
        <i-form-group>
            <i-select :schema="form.group.select" v-model="form.group.select.value" placeholder="Choose an option">
                <i-select-option value="a" label="Option A" />
                <i-select-option value="b" label="Option B" />
                <i-select-option value="c" label="Option C" disabled />
            </i-select>
        </i-form-group>
        <i-form-group>
            <i-checkbox :schema="form.group.checked" v-model="form.group.checked.value">I agree</i-checkbox>
        </i-form-group>
        <i-form-group>
            <i-checkbox-group :schema="form.group.checkbox" v-model="form.group.checkbox.value">
                <i-checkbox value="Football">Football</i-checkbox>
                <i-checkbox value="Volleyball">Volleyball</i-checkbox>
                <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
            </i-checkbox-group>
        </i-form-group>
        <i-form-group>
            <i-radio-group :schema="form.group.radio" v-model="form.group.radio.value">
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
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="Enter your first name.." />
    </i-form-group>
    
    <i-form-group>
        <i-textarea :schema="form.textarea" v-model="form.textarea.value" placeholder="Write a comment.." />
    </i-form-group>
    
    <i-form-group>
        <i-form-group>
            <i-select :schema="form.group.select" v-model="form.group.select.value" placeholder="Choose an option">
                <i-select-option value="a" label="Option A" />
                <i-select-option value="b" label="Option B" />
                <i-select-option value="c" label="Option C" disabled />
            </i-select>
        </i-form-group>
        <i-form-group>
            <i-checkbox-group :schema="form.group.checkbox" v-model="form.group.checkbox.value">
                <i-checkbox value="Football">Football</i-checkbox>
                <i-checkbox value="Volleyball">Volleyball</i-checkbox>
                <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
            </i-checkbox-group>
        </i-form-group>
        <i-form-group>
            <i-radio-group :schema="form.group.radio" v-model="form.group.radio.value">
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
            form: this.$form({
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
