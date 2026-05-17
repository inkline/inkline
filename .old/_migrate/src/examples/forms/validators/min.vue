<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [{ name: 'min', value: 10 }]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <Input name="input" placeholder="This field accepts a minimum value of 10." />
            <FormError for="input" />
        </FormGroup>
    </Form>
</template>
