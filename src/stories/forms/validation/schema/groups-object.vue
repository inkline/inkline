<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';
import { computed } from 'vue';

const schema = useForm({
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
    <i-form v-model="schema">
        <i-form-group>
            <i-form-label>Input for <code>group.input1</code></i-form-label>
            <i-input name="group.input1" placeholder="Type something.." />
            <i-form-error for="group.input1" />
        </i-form-group>
        <i-form-group>
            <i-form-label>Input for <code>group.input2</code></i-form-label>
            <i-input name="group.input2" placeholder="Type something.." />
            <i-form-error for="group.input2" />
        </i-form-group>
        <p>
            Validation status for <code>group</code> (requires both inputs to be filled):
            <strong>{{ groupValidationStatus }}</strong>
        </p>
    </i-form>
</template>
