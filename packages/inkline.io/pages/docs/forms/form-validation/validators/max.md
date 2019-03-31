<i-code-preview title="Max Validator" markup="max" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="maxValidatorForm">
    <i-form-group>
        <i-input :schema="maxValidatorForm.input" v-model="maxValidatorForm.input.value" placeholder="This field accepts a maximum value of 100." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field accepts a maximum value of 100." />
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
                        { rule: 'max', value: 100 }
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
{{ maxValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
