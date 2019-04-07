<i-code-preview title="Max Length Validator" markup="maxLength" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="maxLengthValidatorForm">
    <i-form-group>
        <i-input :schema="maxLengthValidatorForm.input" v-model="maxLengthValidatorForm.input.value" placeholder="This field accepts up to 12 characters." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field accepts up to 12 characters." />
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
                        { rule: 'maxLength', value: 12 }
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
{{ maxLengthValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
