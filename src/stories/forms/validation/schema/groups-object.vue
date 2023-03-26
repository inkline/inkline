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
    <IForm v-model="schema">
        <IFormGroup>
            <IFormLabel>Input for <code>group.input1</code></IFormLabel>
            <IInput name="group.input1" placeholder="Type something.." />
            <IFormError for="group.input1" />
        </IFormGroup>
        <IFormGroup>
            <IFormLabel>Input for <code>group.input2</code></IFormLabel>
            <IInput name="group.input2" placeholder="Type something.." />
            <IFormError for="group.input2" />
        </IFormGroup>
        <p class="_margin-top:2">
            Validation status for <code>group</code> (requires both inputs to be filled):
            <strong>{{ groupValidationStatus }}</strong>
        </p>
    </IForm>
</template>
