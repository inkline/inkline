<script lang="ts" setup>
import { computed } from 'vue';
import { useForm } from '@inkline/validation';

const { schema } = useForm<{
    group: string[];
}>({
    group: [
        {
            validators: [{ name: 'required' }]
        },
        {
            validators: ['required']
        }
    ]
});

const groupValidationStatus = computed(() => {
    return schema.value.group.every((field) => field.dirty)
        ? schema.value.group.every((field) => field.invalid)
            ? 'Invalid'
            : 'Valid'
        : 'Pending';
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup name="group">
            <FormGroup v-for="(_, index) in schema.group" :key="index">
                <FormLabel>
                    Input for <code>group.{{ index }}</code>
                </FormLabel>
                <Input :name="`group.${index}`" placeholder="Type something.." />
                <FormError :for="`group.${index}`" />
            </FormGroup>
        </FormGroup>
        <p class="_margin-top:2">
            Validation status for <code>group</code> (requires both inputs to be filled):
            <strong>{{ groupValidationStatus }}</strong>
        </p>
    </Form>
</template>
