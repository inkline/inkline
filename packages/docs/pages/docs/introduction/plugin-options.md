---
title: Plugin Options
description: Make Inkline your own by changing its various Vue Plugin global configuration options. 
---

You can configure some of Inkline's behaviour globally using the `config` field of the Vue Plugin integration. Here are the default configuration options:

~~~js
Vue.use(Inkline, {
    components: {},
    config: {
        variant: 'light',
        autodetectVariant: false,
        validation: {
            validateOn: ['input'],
            keys: {
                VALUE: 'value',
                NAME: 'name',
                FIELDS: 'fields',
                VALIDATE: 'validate',
                VALIDATE_ON: 'validateOn',
                VALIDATORS: 'validators',
                INVALID: 'invalid',
                VALID: 'valid',
                TOUCH: 'touch',
                TOUCHED: 'touched',
                UNTOUCHED: 'untouched',
                DIRTY: 'dirty',
                PRISTINE: 'pristine',
                SET: 'set',
                ADD: 'add',
                REMOVE: 'remove',
                ERRORS: 'errors'
            }       
        }
    }
});
~~~
