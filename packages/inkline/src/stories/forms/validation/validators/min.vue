<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [{ name: 'min', value: 10 }]
    }
});
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IInput name="input" placeholder="This field accepts a minimum value of 10." />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
