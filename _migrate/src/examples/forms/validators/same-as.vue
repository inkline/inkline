<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    password: string;
    passwordConfirmation: string;
}>({
    password: {
        validators: [{ name: 'required' }]
    },
    passwordConfirmation: {
        validators: [{ name: 'sameAs', target: 'password', schema: () => schema.value }]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <Input type="password" name="password" placeholder="Enter your password" />
            <FormError for="password" />
        </FormGroup>
        <FormGroup>
            <Input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm your password"
            />
            <FormError for="passwordConfirmation" />
        </FormGroup>
    </Form>
</template>
