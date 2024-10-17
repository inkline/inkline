<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    username: string;
    password: string;
}>({
    username: {},
    password: {}
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <FormLabel>Username</FormLabel>
            <Input name="username" placeholder="Enter a username.." />
        </FormGroup>
        <FormGroup>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" placeholder="Enter a password.." />
        </FormGroup>
    </Form>

    <pre class="_margin-top:2 _text:muted">{{ schema }}</pre>
</template>
