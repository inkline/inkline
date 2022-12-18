<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    input: {
        validators: [{ name: 'max', value: 100 }]
    }
});
</script>
<template>
    <i-form v-model="form">
        <i-form-group>
            <i-input name="input" placeholder="This field accepts a maximum value of 100." />
            <i-form-error for="input" />
        </i-form-group>
    </i-form>
</template>
