<script setup lang="ts">
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    username: string;
    password: string;
}>({
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
                validator: (v: string) => /[a-z]/.test(v)
            },
            {
                name: 'custom', // uppercase
                message: 'Please enter at least one uppercase character.',
                validator: (v: string) => /[A-Z]/.test(v)
            },
            {
                name: 'custom', // numeric
                message: 'Please enter at least one numeric character.',
                validator: (v: string) => /[0-9]/.test(v)
            },
            {
                name: 'custom', // symbol
                message: 'Please enter at least one symbol.',
                validator: (v: string) => /[^a-zA-Z0-9]/.test(v)
            }
        ]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <FormLabel>Username</FormLabel>
            <Input name="username" placeholder="Enter a username.." />
            <FormError for="username" />
        </FormGroup>
        <FormGroup>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" placeholder="Enter a password.." />
            <FormError for="password" />
        </FormGroup>
    </Form>

    <pre class="_margin-top:2 _text:muted">{{ schema }}</pre>
</template>
