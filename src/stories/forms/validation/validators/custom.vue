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
    <i-form v-model="form">
        <i-form-group>
            <i-input
                name="input"
                placeholder="This field is custom validated. It needs to contain 'inkline'"
            />
            <i-form-error for="input" />
        </i-form-group>
    </i-form>
</template>
