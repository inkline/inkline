<script lang="ts" setup>
import { useForm } from '@inkline/composables';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [{ name: 'minLength', value: 6 }]
    }
});
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IInput name="input" placeholder="This field requires at least 6 characters." />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
