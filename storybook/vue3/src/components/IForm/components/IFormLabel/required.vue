<script lang="ts">
import { IFormLabel } from '@inkline/inkline/components';

export default {
    components: {
        IFormLabel
    }
};
</script>
<template>
    <i-form-group required>
        <i-form-label>Input Label Required</i-form-label>
        <i-input v-model="value" placeholder="Type something.." />
    </i-form-group>
</template>
<script src="./required.js" />
