<script lang="ts" setup>
import { useForm } from '@inkline/composables';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [{ name: 'max', value: 100 }]
    }
});
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IInput name="input" placeholder="This field accepts a maximum value of 100." />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
