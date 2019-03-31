<i-code-preview title="Required Validator" markup="required" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="requiredValidatorForm">
    <i-form-group>
        <i-input :schema="requiredValidatorForm.input" v-model="requiredValidatorForm.input.value" placeholder="This field is required" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field is required" />
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
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ requiredValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
