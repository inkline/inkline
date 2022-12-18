<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const schema = useForm({
    input: {
        validators: [{ name: 'required', message: 'This field is required' }]
    }
});
</script>
<template>
    <i-form v-model="schema">
        <i-form-group>
            <i-form-label for="input-with-custom-error-message">
                Input with custom error message
            </i-form-label>
            <i-input
                id="input-with-custom-error-message"
                name="input"
                placeholder="Type something.."
            />
            <i-form-error for="input" />
        </i-form-group>
    </i-form>
</template>
