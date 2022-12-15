<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
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
    <i-form v-model="form">
        <i-form-group>
            <i-input name="input" placeholder="This field should contain only letters" />
            <i-form-error for="input" />
        </i-form-group>
        <i-form-group>
            <i-input
                name="inputSpaces"
                placeholder="This field should contain only letters and spaces"
            />
            <i-form-error for="inputSpaces" />
        </i-form-group>
        <i-form-group>
            <i-input
                name="inputDashes"
                placeholder="This field should contain only letters and dashes"
            />
            <i-form-error for="inputDashes" />
        </i-form-group>
    </i-form>
</template>
