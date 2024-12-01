<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [{ name: 'max', value: 100 }]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <Input name="input" placeholder="This field accepts a maximum value of 100." />
            <FormError for="input" />
        </FormGroup>
    </Form>
</template>
