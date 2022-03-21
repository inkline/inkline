<script lang="ts">
import { INumberInput } from '@inkline/inkline/components';

export default {
    components: {
        INumberInput
    }
};
</script>
<template>
    <i-number-input v-model="value" :precision="2" placeholder="Enter a number.." />
</template>
<script src="./precision.js" />
