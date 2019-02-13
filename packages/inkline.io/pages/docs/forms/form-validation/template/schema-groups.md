### Schema Groups

You can define schema groups to determine the validation of a group of inputs.

##### Object Form Groups
Objects that aren't empty and don't have a `value` or `validators` field are treated as form groups. Form groups can be used to see the validation status of specific fields.

<i-code-preview title="Form Schema Form Groups" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js">
<i-form :schema="groupedValueForm">
    <i-form-group>
        <i-input :schema="groupedValueForm.input" v-model="groupedValueForm.input.value" placeholder="Enter your first name.." />
    </i-form-group>
    <i-form-group>
        <i-input :schema="groupedValueForm.group.input" v-model="groupedValueForm.group.input.value" placeholder="Enter your address.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="Enter your first name.." />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.group.input" v-model="form.group.input.value" placeholder="Enter your address.." />
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
                input: {},
                group: {
                    input: {}
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
{{ groupedValueForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>

##### Array Form Groups
Form groups can be an `Array` of fields, allowing you to loop over them using `v-for`.

<i-code-preview title="Form Schema Array Form Groups" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js">
<i-form :schema="arrayValueForm">
    <i-form-group v-for="field in arrayValueForm.group" :key="field.name">
        <i-input :schema="field" v-model="field.value" placeholder="Type something.." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group v-for="field in form.group" :key="field.name">
        <i-input :schema="field" v-model="field.value" placeholder="Type something.." />
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
                group: [
                    { value: 'First Field' },
                    { value: 'Second Field' }
                ]
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
{{ arrayValueForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
