<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const schema = useForm({
    input: {
        value: 'Default value'
    }
});
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IFormLabel for="input-with-default-value"> Input with default value </IFormLabel>
            <IInput id="input-with-default-value" name="input" placeholder="Type something.." />
        </IFormGroup>
    </IForm>
</template>
