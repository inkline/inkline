### Input Default Value
Providing a default value for a schema field can be done using the `value` field as follows:

<i-code-preview title="Form Schema Input Default Value" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js">
<i-form :schema="defaultValueForm">
    <i-form-group>
        <i-input :schema="defaultValueForm.input" v-model="defaultValueForm.input.value" placeholder="Enter your first name.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="Enter your first name.." />
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
                    value: 'Default Value'
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
{{ defaultValueForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
