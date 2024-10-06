<script lang="ts" setup>
import { useForm } from '@inkline/composables';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validateOn: 'input',
        validators: [{ name: 'minLength', value: 5 }]
    }
});
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IFormLabel for="input-with-custom-validation-event">
                Input validated on input
            </IFormLabel>
            <IInput
                id="input-with-custom-validation-event"
                name="input"
                placeholder="Type something.."
            />
            <IFormError for="input" :visible="['invalid']" />
        </IFormGroup>
    </IForm>
</template>
