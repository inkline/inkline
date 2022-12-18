<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    input: {
        validators: [{ name: 'alphanumeric' }]
    },
    inputSpaces: {
        validators: [{ name: 'alphanumeric', allowSpaces: true }]
    },
    inputDashes: {
        validators: [{ name: 'alphanumeric', allowDashes: true }]
    }
});
</script>
<template>
    <IForm v-model="form">
        <IFormGroup>
            <IInput name="input" placeholder="This field should contain only letters and numbers" />
            <IFormError for="input" />
        </IFormGroup>
        <IFormGroup>
            <IInput
                name="inputSpaces"
                placeholder="This field should contain only letters, numbers and spaces"
            />
            <IFormError for="inputSpaces" />
        </IFormGroup>
        <IFormGroup>
            <IInput
                name="inputDashes"
                placeholder="This field should contain only letters, numbers and dashes"
            />
            <IFormError for="inputDashes" />
        </IFormGroup>
    </IForm>
</template>
