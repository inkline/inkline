<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [{ name: 'maxLength', value: 12 }]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <Input name="input" placeholder="This field accepts up to 12 characters." />
            <FormError for="input" />
        </FormGroup>
    </Form>
</template>
