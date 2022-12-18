<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    password: {
        validators: [{ name: 'required' }]
    },
    passwordConfirmation: {
        validators: [{ name: 'sameAs', target: 'password', schema: () => form.value }]
    }
});
</script>
<template>
    <i-form v-model="form">
        <i-form-group>
            <i-input type="password" name="password" placeholder="Enter your password" />
            <i-form-error for="password" />
        </i-form-group>
        <i-form-group>
            <i-input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm your password"
            />
            <i-form-error for="passwordConfirmation" />
        </i-form-group>
    </i-form>
</template>
