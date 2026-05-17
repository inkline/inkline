<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [
            {
                name: 'custom',
                message: 'Please enter a value containing "inkline".',
                validator: (v: string) => /inkline/.test(v)
            }
        ]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <Input
                name="input"
                placeholder="This field is custom validated. It needs to contain 'inkline'"
            />
            <FormError for="input" />
        </FormGroup>
    </Form>
</template>
