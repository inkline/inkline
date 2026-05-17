<script lang="ts" setup>
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    input: string;
    inputNegative: string;
    inputNegativeDecimal: string;
}>({
    input: {
        validators: [{ name: 'number' }]
    },
    inputNegative: {
        validators: [{ name: 'number', allowNegative: true }]
    },
    inputNegativeDecimal: {
        validators: [{ name: 'number', allowNegative: true, allowDecimal: true }]
    }
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <Input name="input" placeholder="This field should contain only numbers" />
            <FormError for="input" />
        </FormGroup>
        <FormGroup>
            <Input
                name="inputNegative"
                placeholder="This field should contain positive or negative numbers"
            />
            <FormError for="inputNegative" />
        </FormGroup>
        <FormGroup>
            <Input
                name="inputNegativeDecimal"
                placeholder="This field should contain positive or negative decimal numbers"
            />
            <FormError for="inputNegativeDecimal" />
        </FormGroup>
    </Form>
</template>
