<script lang="ts" setup>
import { useForm } from '@inkline/inkline';

const { schema } = useForm<{
    input: string;
    inputSpaces: string;
    inputDashes: string;
}>({
    input: {
        validators: [{ name: 'alpha' }]
    },
    inputSpaces: {
        validators: [{ name: 'alpha', allowSpaces: true }]
    },
    inputDashes: {
        validators: [{ name: 'alpha', allowDashes: true }]
    }
});
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IInput name="input" placeholder="This field should contain only letters" />
            <IFormError for="input" />
        </IFormGroup>
        <IFormGroup>
            <IInput
                name="inputSpaces"
                placeholder="This field should contain only letters and spaces"
            />
            <IFormError for="inputSpaces" />
        </IFormGroup>
        <IFormGroup>
            <IInput
                name="inputDashes"
                placeholder="This field should contain only letters and dashes"
            />
            <IFormError for="inputDashes" />
        </IFormGroup>
    </IForm>
</template>
