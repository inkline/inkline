### Input Validation Event
By using the `validateOn` field you can specify the event that triggers the validation. The most common events are `input` and `blur`.

<i-code-preview title="Input Validation Events" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js">
<i-form :schema="validateOnForm">
    <i-form-group>
        <i-input :schema="validateOnForm.input1" v-model="validateOnForm.input1.value" placeholder="This field is validated on input" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="validateOnForm.input2" v-model="validateOnForm.input2.value" placeholder="This field is validated on blur" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input1" v-model="form.input1.value" placeholder="This field is validated on input" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.input2" v-model="form.input2.value" placeholder="This field is validated on blur" />
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
                input1: {
                    validateOn: 'input',
                    validators: [
                        { rule: 'minLength', value: 6 }
                    ]
                },
                input2: {
                    validateOn: 'blur',
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
{{ validateOnForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
