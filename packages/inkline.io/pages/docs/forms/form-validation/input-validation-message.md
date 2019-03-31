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
