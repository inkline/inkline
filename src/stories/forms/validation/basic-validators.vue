<script setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    username: {
        validators: [
            {
                name: 'required'
            }
        ]
    },
    password: {
        validators: [
            {
                name: 'required'
            },
            {
                name: 'minLength',
                value: 8
            },
            {
                name: 'custom', // lowercase
                message: 'Please enter at least one lowercase character.',
                validator: (v) => /[a-z]/.test(v)
            },
            {
                name: 'custom', // uppercase
                message: 'Please enter at least one uppercase character.',
                validator: (v) => /[A-Z]/.test(v)
            },
            {
                name: 'custom', // numeric
                message: 'Please enter at least one numeric character.',
                validator: (v) => /[0-9]/.test(v)
            },
            {
                name: 'custom', // symbol
                message: 'Please enter at least one symbol.',
                validator: (v) => /[^a-zA-Z0-9]/.test(v)
            }
        ]
    }
});
</script>
<template>
    <i-form v-model="form">
        <i-form-group>
            <i-form-label>Username</i-form-label>
            <i-input name="username" placeholder="Enter a username.." />
            <i-form-error for="username" />
        </i-form-group>
        <i-form-group>
            <i-form-label>Password</i-form-label>
            <i-input name="password" type="password" placeholder="Enter a password.." />
            <i-form-error for="password" />
        </i-form-group>
    </i-form>

    <pre class="_margin-top:2 _text:muted">{{ form }}</pre>
</template>
