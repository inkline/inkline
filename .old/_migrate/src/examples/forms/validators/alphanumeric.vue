<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    input: string;
    inputSpaces: string;
    inputDashes: string;
}>({
    input: {
        validators: [{ name: 'alphanumeric' }]
    },
    inputSpaces: {
        validators: [{ name: 'alphanumeric', allowSpaces: true }]
    },
    inputDashes: {
        validators: [{ name: 'alphanumeric', allowDashes: true }]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <Input name="input" placeholder="This field should contain only letters and numbers" />
            <FormError for="input" />
        </FormGroup>
        <FormGroup>
            <Input
                name="inputSpaces"
                placeholder="This field should contain only letters, numbers and spaces"
            />
            <FormError for="inputSpaces" />
        </FormGroup>
        <FormGroup>
            <Input
                name="inputDashes"
                placeholder="This field should contain only letters, numbers and dashes"
            />
            <FormError for="inputDashes" />
        </FormGroup>
    </Form>
</template>
