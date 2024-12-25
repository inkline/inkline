<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [{ name: 'minLength', value: 6 }]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <Input name="input" placeholder="This field requires at least 6 characters." />
            <FormError for="input" />
        </FormGroup>
    </Form>
</template>
