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
