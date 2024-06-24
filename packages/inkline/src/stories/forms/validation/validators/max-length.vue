<script lang="ts" setup>
import { useForm } from '@inkline/inkline';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [{ name: 'maxLength', value: 12 }]
    }
});
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IInput name="input" placeholder="This field accepts up to 12 characters." />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
