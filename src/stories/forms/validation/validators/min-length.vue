<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    input: {
        validators: [{ name: 'minLength', value: 6 }]
    }
});
</script>
<template>
    <i-form v-model="form">
        <i-form-group>
            <i-input name="input" placeholder="This field requires at least 6 characters." />
            <i-form-error for="input" />
        </i-form-group>
    </i-form>
</template>
