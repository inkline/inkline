<i-code-preview title="Alpha Validator" markup="alpha" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="alphaValidatorForm">
    <i-form-group>
        <i-input :schema="alphaValidatorForm.input" v-model="alphaValidatorForm.input.value" placeholder="This field should contain only letters" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="alphaValidatorForm.inputSpaces" v-model="alphaValidatorForm.inputSpaces.value" placeholder="This field should contain only letters and spaces" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="alphaValidatorForm.inputDashes" v-model="alphaValidatorForm.inputDashes.value" placeholder="This field should contain only letters and dashes" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field should contain only letters" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputSpaces" v-model="form.inputSpaces.value" placeholder="This field should contain only letters and spaces" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputDashes" v-model="form.inputDashes.value" placeholder="This field should contain only letters and dashes" />
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
                        { rule: 'alpha' }
                    ]
                },
                inputSpaces: {
                    validators: [
                        { rule: 'alpha', allowSpaces: true },
                    ]
                },
                inputDashes: {
                    validators: [
                        { rule: 'alpha', allowDashes: true }
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
