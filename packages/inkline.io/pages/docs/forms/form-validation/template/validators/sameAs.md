<i-code-preview title="Same As Validator" markup="sameAs" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="sameAsValidatorForm">
    <i-form-group>
        <i-input :schema="sameAsValidatorForm.password" v-model="sameAsValidatorForm.password.value" type="password" placeholder="Password" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="sameAsValidatorForm.passwordConfirmation" v-model="sameAsValidatorForm.passwordConfirmation.value" type="password" placeholder="Password Confirmation" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.password" v-model="form.password.value" placeholder="Password" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.passwordConfirmation" v-model="form.passwordConfirmation.value" placeholder="Password Confirmation" />
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
                password: {},
                passwordConfirmation: {
                    validators: [
                        { rule: 'sameAs', target: 'password' }
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
{{ sameAsValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
