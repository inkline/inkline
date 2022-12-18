<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    input: {
        validators: [{ name: 'min', value: 10 }]
    }
});
</script>
<template>
    <IForm v-model="form">
        <IFormGroup>
            <IInput name="input" placeholder="This field accepts a minimum value of 10." />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
