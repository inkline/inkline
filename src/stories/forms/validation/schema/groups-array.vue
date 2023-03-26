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
    <IForm v-model="schema">
        <IFormGroup name="group">
            <IFormGroup v-for="(_, index) in schema.group" :key="index">
                <IFormLabel>
                    Input for <code>group.{{ index }}</code>
                </IFormLabel>
                <IInput :name="`group.${index}`" placeholder="Type something.." />
                <IFormError :for="`group.${index}`" />
            </IFormGroup>
        </IFormGroup>
        <p class="_margin-top:2">
            Validation status for <code>group</code> (requires both inputs to be filled):
            <strong>{{ groupValidationStatus }}</strong>
        </p>
    </IForm>
</template>
