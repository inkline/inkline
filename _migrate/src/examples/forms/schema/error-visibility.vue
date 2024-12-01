<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [{ name: 'minLength', value: 5 }]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <FormLabel for="input-with-custom-error-visibility">
                Input validated on input
            </FormLabel>
            <Input
                id="input-with-custom-error-visibility"
                name="input"
                placeholder="Type something.."
                :error="['invalid']"
            />
            <FormError for="input" :visible="['invalid']" />
        </FormGroup>
    </Form>
</template>
