<script lang="ts">
import { INumberInput } from '@inkline/inkline/components';

export default {
    components: {
        INumberInput
    }
};
</script>
<template>
    <i-number-input v-model="value" :step="10" placeholder="Enter a number.." />
</template>
<script src="./step-size.js" />
