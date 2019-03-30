### Dynamically Added Fields and Groups
The form validation framework wouldn't be complete without dynamically added fields and groups. Inkline provides a simple API for adding and removing fields.

##### Object Group Operations
Just like Arrays, Objects can be manipulated and kept up to date using a custom API. You can use the `$set` method to update an object field. To enable reactivity, we'll need to also pass in the current Vue instance inside the options to take advantage of it's internal methods.

<code>this.form.group.$set(name, item, options)</code>

<i-code-preview title="Form Schema Object Group Operations" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js" class="_padding-bottom-0">
<i-form :schema="objectForm">
    <i-form-group>
        <i-input :schema="objectForm.name" v-model="objectForm.name.value" placeholder="Enter your name.." />
    </i-form-group>
    <i-form-group v-if="objectForm.email">
        <i-input :schema="objectForm.email" v-model="objectForm.email.value" placeholder="Enter your email.." />
    </i-form-group>
    <i-form-group v-if="objectForm.address">
        <i-input :schema="objectForm.address" v-model="objectForm.address.value" placeholder="Enter your address.." />
    </i-form-group>
    <i-form-group>
        <i-button @click="setEmail" type="button">Set Email</i-button>&nbsp;
        <i-button @click="setAddress" type="button">Set Address</i-button>&nbsp;
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.name" v-model="form.name.value" placeholder="Enter your name.." />
    </i-form-group>
    <i-form-group v-if="form.email">
        <i-input :schema="form.email" v-model="form.email.value" placeholder="Enter your email.." />
    </i-form-group>
    <i-form-group v-if="form.address">
        <i-input :schema="form.address" v-model="form.address.value" placeholder="Enter your address.." />
    </i-form-group>
    
    <i-form-group>
        <i-button @click="setEmail" type="button">Set Email</i-button>&nbsp;
        <i-button @click="setAddress" type="button">Set Address</i-button>&nbsp;
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
                name: {}
            })
        };
    },
    methods: {
        setEmail() {
            this.form.$set('email', {
                validators: [
                    { rule: 'email' }
                ]
            }, { instance: this });
        },
        setAddress() {
            this.form.$set('address', {
                value: '32 Inkline St.'
            }, { instance: this });
        }
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ objectForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>


##### Array Group Operations
Inkline provides you with custom implementations for Array group operations using `$push` and`$splice`. These two methods will take care of registering events and making sure your form schema is always up to date.

<code>this.form.group.$push(item, options)</code><br/>
<code>this.form.group.$splice(index, deleteCount, item, options)</code>

<i-code-preview title="Form Schema Array Group Operations" link="https://github.com/inkline/inkline/blob/master/src/factories/FormBuilder.js" class="_padding-bottom-0">
<i-form :schema="listForm">
    <i-form-group v-for="item in listForm.items" :key="item.name">
        <i-input :schema="item" v-model="item.value" placeholder="Type something.." />
    </i-form-group>
    <i-form-group>
        <i-button @click="addField" type="button">Add</i-button>&nbsp;
        <i-button @click="removeField" type="button">Remove First</i-button>&nbsp;
        <i-button @click="replaceField" type="button">Replace First</i-button>
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group v-for="item in form.items" :key="item.name">
        <i-input :schema="item" v-model="item.value" placeholder="Type something.." />
    </i-form-group>
    
    <i-form-group>
        <i-button @click="addField" type="button">Add</i-button>
        <i-button @click="removeField" type="button">Remove First</i-button>
        <i-button @click="replaceField" type="button">Replace First</i-button>
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
                items: [
                    { value: 'Existing Field' },
                    { value: 'Existing Field' }
                ]
            })
        };
    },
    methods: {
        addField() {
            this.listForm.items.$push({ value: 'Added Field' });
        },
        removeField() {
            this.listForm.items.$splice(0, 1);
        },
        replaceField() {
            this.listForm.items.$splice(0, 1, { value: 'Spliced Field' });
        }
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ listForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
