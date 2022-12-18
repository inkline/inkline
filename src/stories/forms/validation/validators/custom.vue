<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    input: {
        validators: [
            {
                name: 'custom',
                message: 'Please enter a value containing "inkline".',
                validator: (v: string) => /inkline/.test(v)
            }
        ]
    }
});
</script>
<template>
    <IForm v-model="form">
        <IFormGroup>
            <IInput
                name="input"
                placeholder="This field is custom validated. It needs to contain 'inkline'"
            />
            <IFormError for="input" />
        </IFormGroup>
    </IForm>
</template>
