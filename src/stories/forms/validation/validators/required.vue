<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    input: {
        validators: [{ name: 'required' }]
    }
});
</script>
<template>
    <IForm v-model="form">
        <IFormGroup>
            <IInput name="input" placeholder="This field is required" />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
