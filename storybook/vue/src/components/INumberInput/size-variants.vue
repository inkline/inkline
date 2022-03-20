<script lang="ts">
import { INumberInput } from '@inkline/inkline/components';

export default {
    components: {
        INumberInput
    }
};
</script>
<template>
    <i-number-input v-model="value" size="sm" placeholder="Enter a number.." />
    
    <i-number-input v-model="value" size="md" placeholder="Enter a number.." />
    
    <i-number-input v-model="value" size="lg" placeholder="Enter a number.." />
</template>
<script src="./size-variants.demo.js" />
