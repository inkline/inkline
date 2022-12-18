<script lang="ts" setup>
import { computed } from 'vue';
import { useForm } from '@inkline/inkline/composables';

const schema = useForm({
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
    return schema.value.group.dirty
        ? schema.value.group.invalid
            ? 'Invalid'
            : 'Valid'
        : 'Pending';
});
</script>
<template>
    <i-form v-model="schema">
        <i-form-group name="group">
            <i-form-group v-for="(_, index) in schema.group" :key="index">
                <i-form-label>
                    Input for <code>group.{{ index }}</code>
                </i-form-label>
                <i-input :name="`group.${index}`" placeholder="Type something.." />
                <i-form-error :for="`group.${index}`" />
            </i-form-group>
        </i-form-group>
        <p>
            Validation status for <code>group</code> (requires both inputs to be filled):
            <strong>{{ groupValidationStatus }}</strong>
        </p>
    </i-form>
</template>
