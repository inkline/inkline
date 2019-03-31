<i-code-preview title="Min Length Validator" markup="minLength" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="minLengthValidatorForm">
    <i-form-group>
        <i-input :schema="minLengthValidatorForm.input" v-model="minLengthValidatorForm.input.value" placeholder="This field requires at least 6 characters." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field requires at least 6 characters." />
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
{{ minLengthValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
