<script lang="ts">
import { INumberInput } from '@inkline/inkline/components';

export default {
    components: {
        INumberInput
    }
};
</script>
<template>
    <i-number-input v-model="value" color="light" placeholder="Enter a number.." />
    
    <i-number-input v-model="value" color="dark" placeholder="Enter a number.." />
</template>
<script src="./color-variants.demo.js" />
