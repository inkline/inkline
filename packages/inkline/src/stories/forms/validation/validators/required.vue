<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const { schema } = useForm<{
    input: string;
}>({
    input: {
        validators: [{ name: 'required' }]
    }
});
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IInput name="input" placeholder="This field is required" />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
