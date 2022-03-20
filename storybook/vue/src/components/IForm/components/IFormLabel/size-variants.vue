<script lang="ts">
import { IFormLabel } from '@inkline/inkline/components';

export default {
    components: {
        IFormLabel
    }
};
</script>
<template>
    <i-form-group>
        <i-form-label size="sm">Input</i-form-label>
        <i-input v-model="input" placeholder="Type something.." />
    </i-form-group>
    
    <i-form-group>
        <i-form-label size="md">Input</i-form-label>
        <i-input v-model="input" placeholder="Type something.." />
    </i-form-group>
    
    <i-form-group>
        <i-form-label size="lg">Input</i-form-label>
        <i-input v-model="input" placeholder="Type something.." />
    </i-form-group>
</template>
<script src="./size-variants.demo.js" />
