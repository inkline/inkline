<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validateOn: 'input',
        validators: [{ name: 'minLength', value: 5 }]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <FormLabel for="input-with-custom-validation-event">
                Input validated on input
            </FormLabel>
            <Input
                id="input-with-custom-validation-event"
                name="input"
                placeholder="Type something.."
            />
            <FormError for="input" :visible="['invalid']" />
        </FormGroup>
    </Form>
</template>
