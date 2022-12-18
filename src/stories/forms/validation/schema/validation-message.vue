<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const schema = useForm({
    input: {
        validators: [{ name: 'required', message: 'This field is required' }]
    }
});
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IFormLabel for="input-with-custom-error-message">
                Input with custom error message
            </IFormLabel>
            <IInput
                id="input-with-custom-error-message"
                name="input"
                placeholder="Type something.."
            />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
