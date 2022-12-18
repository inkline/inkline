<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    input: {
        validators: [{ name: 'minLength', value: 6 }]
    }
});
</script>
<template>
    <IForm v-model="form">
        <IFormGroup>
            <IInput name="input" placeholder="This field requires at least 6 characters." />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
