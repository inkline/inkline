<i-code-preview title="Email Validator" markup="email" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="emailValidatorForm">
    <i-form-group>
        <i-input :schema="emailValidatorForm.input" v-model="emailValidatorForm.input.value" placeholder="This field an is email" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field is an email" />
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
                        { rule: 'email' }
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
{{ emailValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
