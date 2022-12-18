<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    input: {
        validators: [{ name: 'maxLength', value: 12 }]
    }
});
</script>
<template>
    <IForm v-model="form">
        <IFormGroup>
            <IInput name="input" placeholder="This field accepts up to 12 characters." />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
