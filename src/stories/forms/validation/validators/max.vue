<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    input: {
        validators: [{ name: 'max', value: 100 }]
    }
});
</script>
<template>
    <IForm v-model="form">
        <IFormGroup>
            <IInput name="input" placeholder="This field accepts a maximum value of 100." />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
