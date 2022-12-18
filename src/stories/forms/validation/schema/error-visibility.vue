<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const schema = useForm({
    input: {
        validators: [{ name: 'minLength', value: 5 }]
    }
});
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IFormLabel for="input-with-custom-error-visibility">
                Input validated on input
            </IFormLabel>
            <IInput
                id="input-with-custom-error-visibility"
                name="input"
                placeholder="Type something.."
                :error="['invalid']"
            />
            <IFormError for="input" :visible="['invalid']" />
        </IFormGroup>
    </IForm>
</template>
