---
title: Form Methods
description: The form validation framework wouldn't be complete without dynamically added fields and groups.  
---

# Form Methods
## The form validation framework wouldn't be complete without dynamically added fields and groups.  

Inkline provides a simple API for adding and removing fields.

### Object Group Operations
Just like Arrays, Objects can be manipulated and kept up to date using a custom API. You can use the `set` method to update an object field. To enable reactivity, we'll need to also pass in the current Vue instance inside the options to take advantage of it's internal methods.

<code>this.form.group.set(name, item, options)</code>

<i-code title="Form Schema Object Group Operations">
<i-tab type="preview">
    <i-form v-model="objectForm">
        <i-form-group>
            <i-input :schema="objectForm.fullName" placeholder="Enter your name.." />
        </i-form-group>
        <i-form-group v-if="objectForm.email">
            <i-input :schema="objectForm.email" placeholder="Enter your email.." />
        </i-form-group>
        <i-form-group v-if="objectForm.address">
            <i-input :schema="objectForm.address" placeholder="Enter your address.." />
        </i-form-group>
        <i-form-group>
            <i-button @click="setEmail" type="button">Set Email</i-button>&nbsp;
            <i-button @click="setAddress" type="button">Set Address</i-button>&nbsp;
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.fullName" placeholder="Enter your name.." />
    </i-form-group>
    <i-form-group v-if="form.email">
        <i-input :schema="form.email" placeholder="Enter your email.." />
    </i-form-group>
    <i-form-group v-if="form.address">
        <i-input :schema="form.address" placeholder="Enter your address.." />
    </i-form-group>
    
    <i-form-group>
        <i-button @click="setEmail" type="button">Set Email</i-button>&nbsp;
        <i-button @click="setAddress" type="button">Set Address</i-button>&nbsp;
    </i-form-group>
</i-form>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
                fullName: {}
            })
        };
    },
    methods: {
        setEmail() {
            this.form.set('email', {
                validators: [
                    { rule: 'email' }
                ]
            }, { instance: this });
        },
        setAddress() {
            this.form.set('address', {
                value: '32 Inkline St.'
            }, { instance: this });
        }
    }
}
~~~

</i-tab>
<i-tab type="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ objectForm | prettify }}
</code>
</pre>
</i-tab>
</i-code>

You can use `options.group` to specify whether the value being set is a group of fields. If not specified or set to `false`, the field will be a standalone field.

### Array Group Operations
Inkline provides you with custom implementations for Array group operations using `push` and`splice`. These two methods will take care of registering events and making sure your form schema is always up to date.

<code>this.form.group.add(item, options)</code><br/>
<code>this.form.group.remove(index, deleteCount, item, options)</code>

<i-code title="Form Schema Array Group Operations">
<i-tab type="preview">
    <i-form v-model="listForm">
        <i-form-group v-for="item in listForm.items" :key="item.name">
            <i-input :schema="item" placeholder="Type something.." />
        </i-form-group>
        <i-form-group>
            <i-button @click="addField" type="button">Add</i-button>&nbsp;
            <i-button @click="removeField" type="button">Remove First</i-button>&nbsp;
            <i-button @click="replaceField" type="button">Replace First</i-button>
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

~~~html
<i-form v-model="form">
    <i-form-group v-for="item in form.items" :key="item.name">
        <i-input :schema="item" placeholder="Type something.." />
    </i-form-group>
    
    <i-form-group>
        <i-button @click="addField" type="button">Add</i-button>
        <i-button @click="removeField" type="button">Remove First</i-button>
        <i-button @click="replaceField" type="button">Replace First</i-button>
    </i-form-group>
</i-form>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
                items: [
                    { value: 'Existing Field' },
                    { value: 'Existing Field' }
                ]
            })
        };
    },
    methods: {
        addField() {
            this.form.items.add({ value: 'Added Field' });
        },
        removeField() {
            this.form.items.remove(0, 1);
        },
        replaceField() {
            this.form.items.remove(0, 1, { value: 'Spliced Field' });
        }
    }
}
~~~

</i-tab>
<i-tab type="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ listForm | prettify }}
</code>
</pre>
</i-tab>
</i-code>

You can use `options.group` to specify whether the value being added is a group of fields. If not specified or set to `false`, the field will be a standalone field.
