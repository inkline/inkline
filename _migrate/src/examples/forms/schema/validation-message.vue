<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [{ name: 'required', message: 'This field is required' }]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <FormLabel for="input-with-custom-error-message">
                Input with custom error message
            </FormLabel>
            <Input
                id="input-with-custom-error-message"
                name="input"
                placeholder="Type something.."
            />
            <FormError for="input" />
        </FormGroup>
    </Form>
</template>
