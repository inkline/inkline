---
title: Form Schema
description: The form validation schema defines the form input fields, groups and how they work together.
---

# Form Schema
## The form validation schema defines the form input fields, groups and how they work together.

### Schema Example
The `<i-form>` component and all input components have a `schema` property that can be used to provide form schema validation. From the <nuxt-link :to="{ name: 'docs-forms-validation-schema' }">Introduction</nuxt-link> page we've learned:

- The schema object provides form validation status fields such as `valid`, `invalid`, `touched`, `untouched`, `dirty`, `pristine` and `errors`.
- The `<i-form>` component needs to receive the `form` object as a `schema`
- Each child input needs to receive the `form.inputName` as a `schema` and `form.inputName.value` as a `v-model`

Using the `validators` field, you can specify an array of validators to be used on the input.

<i-code title="Form Schema Example">
<i-tab type="preview">
    <i-form v-model="basicForm">
        <i-form-group>
            <i-input :schema="basicForm.input" placeholder="Enter your first name.." />
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="Enter your first name.." />
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

</i-tab>
<i-tab type="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ basicForm | prettify }}
</code>
</pre>
</i-tab>
</i-code>

<i-alert variant="info" class="-code">
    <template slot="icon">
        <i class="inkline-icon -info h3"></i>
    </template>
    The following keywords are reserved for validation purposes and cannot be used as field names:
    <div class="_margin-top-1-2"></div>
    <code>name</code>,
    <code>value</code>,
    <code>fields</code>,
    <code>validate</code>,
    <code>validateOn</code>,
    <code>validators</code>,
    <code>invalid</code>,
    <code>valid</code>,
    <code>touch</code>,
    <code>touched</code>,
    <code>untouched</code>,
    <code>dirty</code>,
    <code>pristine</code>,
    <code>set</code>,
    <code>add</code>,
    <code>remove</code>,
    <code>errors</code>.
</i-alert>

If needed, you can change the reserved validation keywords / field names by updating the <nuxt-link :to="{ name: 'docs-introduction-plugin-options' }">Plugin Options</nuxt-link>.

### Input Default Value
Providing a default value for a schema field can be done using the `value` field as follows:

<i-code title="Form Schema Input Default Value">
<i-tab type="preview">
    <i-form v-model="defaultValueForm">
        <i-form-group>
            <i-input :schema="defaultValueForm.input" placeholder="Enter your first name.." />
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="Enter your first name.." />
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
                input: {
                    value: 'Default Value'
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
{{ defaultValueForm | prettify }}
</code>
</pre>
</i-tab>
</i-code>


### Input Validation Message
Each validator accepts a custom error message using the `message` field. This allows you to use i18n to display error messages.

<i-code title="Input Validation Message">
<i-tab type="preview">
    <i-form v-model="validateValueForm">
        <i-form-group>
            <i-input :schema="validateValueForm.input" placeholder="Enter your first name.." />
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="Enter your first name.." />
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

</i-tab>
<i-tab type="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ validateValueForm | prettify }}
</code>
</pre>
</i-tab>
</i-code>

### Input Validation Event
By using the `validateOn` field you can specify the event that triggers the validation. The most common events are `input` and `blur`.

<i-code title="Input Validation Events">
<i-tab type="preview">
    <i-form v-model="validateOnForm">
        <i-form-group>
            <i-input :schema="validateOnForm.input1" placeholder="This field is validated on input" />
        </i-form-group>
        <i-form-group>
            <i-input :schema="validateOnForm.input2" placeholder="This field is validated on blur" />
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

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

</i-tab>
<i-tab type="js">

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

</i-tab>
<i-tab type="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ validateOnForm | prettify }}
</code>
</pre>
</i-tab>
</i-code>

### Schema Groups

You can define schema groups to determine the validation of a group of inputs.

##### Object Form Groups
Objects that aren't empty and don't have a `value` or `validators` field are treated as form groups. Form groups can be used to see the validation status of specific fields.

<i-code title="Form Schema Form Groups">
<i-tab type="preview">
    <i-form v-model="groupedValueForm">
        <i-form-group>
            <i-input :schema="groupedValueForm.input" placeholder="Enter your first name.." />
        </i-form-group>
        <i-form-group>
            <i-input :schema="groupedValueForm.group.input" placeholder="Enter your address.." />
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

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

</i-tab>
<i-tab type="js">

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

</i-tab>
<i-tab type="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ groupedValueForm | prettify }}
</code>
</pre>
</i-tab>
</i-code>

##### Array Form Groups
Form groups can be an `Array` of fields, allowing you to loop over them using `v-for`.

<i-code title="Form Schema Array Form Groups">
<i-tab type="preview">
    <i-form v-model="arrayValueForm">
        <i-form-group v-for="field in arrayValueForm.group" :key="field.name">
            <i-input :schema="field" placeholder="Type something.." />
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

~~~html
<i-form v-model="form">
    <i-form-group v-for="field in form.group" :key="field.name">
        <i-input :schema="field" placeholder="Type something.." />
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
                group: [
                    { value: 'First Field' },
                    { value: 'Second Field' }
                ]
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
{{ arrayValueForm | prettify }}
</code>
</pre>
</i-tab>
</i-code>

### Complete Form Example

The `<i-form>` component and all input components have a `schema` property that can be used to provide form schema validation. The schema object provides form validation status fields such as `valid`, `invalid`, `touched`, `untouched`, `dirty`, `pristine` and `errors`.

The schema object `this.form` contains the validation state of the `<i-form>`, and is updated as soon as the input changes. The object looks as seen in the Output tab:

<i-code title="Complete Form Example">
<i-tab type="preview">
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
</i-tab>
<i-tab type="html">

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

</i-tab>
<i-tab type="js">

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
