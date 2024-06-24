<script lang="ts" setup>
import { useForm } from '@inkline/inkline';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [{ name: 'email' }]
    }
});
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IInput name="input" placeholder="This field should contain an email" />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
