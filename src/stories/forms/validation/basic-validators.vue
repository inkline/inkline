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
    <IForm v-model="form">
        <IFormGroup>
            <IFormLabel>Username</IFormLabel>
            <IInput name="username" placeholder="Enter a username.." />
            <IFormError for="username" />
        </IFormGroup>
        <IFormGroup>
            <IFormLabel>Password</IFormLabel>
            <IInput name="password" type="password" placeholder="Enter a password.." />
            <IFormError for="password" />
        </IFormGroup>
    </IForm>

    <pre class="_margin-top:2 _text:muted">{{ form }}</pre>
</template>
