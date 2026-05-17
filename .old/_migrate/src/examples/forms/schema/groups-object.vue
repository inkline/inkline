<script lang="ts" setup>
import { useForm } from '@inkline/validation';
import { computed } from 'vue';

const { schema } = useForm<{
    group: {
        input1: string;
        input2: string;
    };
}>({
    group: {
        input1: {
            validators: [{ name: 'required' }]
        },
        input2: {
            validators: ['required']
        }
    }
});

const groupValidationStatus = computed(() => {
    return schema.value.group.dirty
        ? schema.value.group.invalid
            ? 'Invalid'
            : 'Valid'
        : 'Pending';
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <FormLabel>Input for <code>group.input1</code></FormLabel>
            <Input name="group.input1" placeholder="Type something.." />
            <FormError for="group.input1" />
        </FormGroup>
        <FormGroup>
            <FormLabel>Input for <code>group.input2</code></FormLabel>
            <Input name="group.input2" placeholder="Type something.." />
            <FormError for="group.input2" />
        </FormGroup>
        <p class="_margin-top:2">
            Validation status for <code>group</code> (requires both inputs to be filled):
            <strong>{{ groupValidationStatus }}</strong>
        </p>
    </Form>
</template>
