### Complete Form Example

The `<i-form>` component and all input components have a `schema` property that can be used to provide form schema validation. The schema object provides form validation status fields such as `valid`, `invalid`, `touched`, `untouched`, `dirty`, `pristine` and `errors`.

The schema object `this.form` contains the validation state of the `<i-form>`, and is updated as soon as the input changes. The object looks as seen in the Output tab: 

<i-code-preview title="Complete Form Example" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js">
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
