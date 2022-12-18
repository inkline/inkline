<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    input: {
        validators: [{ name: 'number' }]
    },
    inputNegative: {
        validators: [{ name: 'number', allowNegative: true }]
    },
    inputNegativeDecimal: {
        validators: [{ name: 'number', allowNegative: true, allowDecimal: true }]
    }
});
</script>
<template>
    <IForm v-model="form">
        <IFormGroup>
            <IInput name="input" placeholder="This field should contain only numbers" />
            <IFormError for="input" />
        </IFormGroup>
        <IFormGroup>
            <IInput
                name="inputNegative"
                placeholder="This field should contain positive or negative numbers"
            />
            <IFormError for="inputNegative" />
        </IFormGroup>
        <IFormGroup>
            <IInput
                name="inputNegativeDecimal"
                placeholder="This field should contain positive or negative decimal numbers"
            />
            <IFormError for="inputNegativeDecimal" />
        </IFormGroup>
    </IForm>
</template>
