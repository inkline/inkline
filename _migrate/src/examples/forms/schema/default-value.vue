<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        value: 'Default value'
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <FormLabel for="input-with-default-value"> Input with default value </FormLabel>
            <Input id="input-with-default-value" name="input" placeholder="Type something.." />
        </FormGroup>
    </Form>
</template>
