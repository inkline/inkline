<i-code-preview title="Number Validator" markup="number" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="numberValidatorForm">
    <i-form-group>
        <i-input :schema="numberValidatorForm.input" v-model="numberValidatorForm.input.value" placeholder="This field should contain positive numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="numberValidatorForm.inputNegative" v-model="numberValidatorForm.inputNegative.value" placeholder="This field should contain positive or negative numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="numberValidatorForm.inputNegativeDecimal" v-model="numberValidatorForm.inputNegativeDecimal.value" placeholder="This field should contain positive or negative decimal numbers" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field should contain only numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputNegative" v-model="form.inputNegative.value" placeholder="This field should contain positive or negative numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputNegativeDecimal" v-model="form.inputNegativeDecimal.value" placeholder="This field should contain positive or negative decimal numbers" />
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
                        { rule: 'number' }
                    ]
                },
                inputNegative: {
                    validators: [
                        { rule: 'number', allowNegative: true }
                    ]
                },
                inputNegativeDecimal: {
                    validators: [
                        { rule: 'number', allowNegative: true, allowDecimal: true }
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
{{ numberValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
