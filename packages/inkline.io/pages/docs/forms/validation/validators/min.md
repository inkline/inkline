<i-code-preview title="Min Validator" markup="min" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="minValidatorForm">
    <i-form-group>
        <i-input :schema="minValidatorForm.input" v-model="minValidatorForm.input.value" placeholder="This field accepts a minimum value of 10." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field accepts a minimum value of 10." />
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
                        { rule: 'min', value: 10 }
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
{{ minValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
