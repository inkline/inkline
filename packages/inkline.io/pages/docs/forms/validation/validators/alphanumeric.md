<i-code-preview title="Alphanumeric Validator" markup="alphanumeric" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="alphaValidatorForm">
    <i-form-group>
        <i-input :schema="alphanumericValidatorForm.input" v-model="alphanumericValidatorForm.input.value" placeholder="This field should contain only letters and numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="alphanumericValidatorForm.inputSpaces" v-model="alphanumericValidatorForm.inputSpaces.value" placeholder="This field should contain only letters, numbers and spaces" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="alphanumericValidatorForm.inputDashes" v-model="alphanumericValidatorForm.inputDashes.value" placeholder="This field should contain only letters, numbers and dashes" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field should contain only letters and numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputSpaces" v-model="form.inputSpaces.value" placeholder="This field should contain only letters, numbers and spaces" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputDashes" v-model="form.inputDashes.value" placeholder="This field should contain only letters, numbers and dashes" />
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
                        { rule: 'alphanumeric' }
                    ]
                },
                inputSpaces: {
                    validators: [
                        { rule: 'alphanumeric', allowSpaces: true },
                    ]
                },
                inputDashes: {
                    validators: [
                        { rule: 'alphanumeric', allowDashes: true }
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
{{ alphaValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
