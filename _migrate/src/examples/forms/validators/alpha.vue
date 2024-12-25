<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    input: string;
    inputSpaces: string;
    inputDashes: string;
}>({
    input: {
        validators: [{ name: 'alpha' }]
    },
    inputSpaces: {
        validators: [{ name: 'alpha', allowSpaces: true }]
    },
    inputDashes: {
        validators: [{ name: 'alpha', allowDashes: true }]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <Input name="input" placeholder="This field should contain only letters" />
            <FormError for="input" />
        </FormGroup>
        <FormGroup>
            <Input
                name="inputSpaces"
                placeholder="This field should contain only letters and spaces"
            />
            <FormError for="inputSpaces" />
        </FormGroup>
        <FormGroup>
            <Input
                name="inputDashes"
                placeholder="This field should contain only letters and dashes"
            />
            <FormError for="inputDashes" />
        </FormGroup>
    </Form>
</template>
