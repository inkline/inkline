<script lang="ts" setup>
import { useForm } from '@inkline/inkline';

const { schema } = useForm<{
    password: string;
    passwordConfirmation: string;
}>({
    password: {
        validators: [{ name: 'required' }]
    },
    passwordConfirmation: {
        validators: [{ name: 'sameAs', target: 'password', schema: () => schema.value }]
    }
});
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IInput type="password" name="password" placeholder="Enter your password" />
            <IFormError for="password" />
        </IFormGroup>
        <IFormGroup>
            <IInput
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm your password"
            />
            <IFormError for="passwordConfirmation" />
        </IFormGroup>
    </IForm>
</template>
