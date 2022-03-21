<script lang="ts">
import { INumberInput } from '@inkline/inkline/components';

export default {
    components: {
        INumberInput
    }
};
</script>
<template>
    <i-number-input v-model="value" disabled placeholder="Enter a number.." />
</template>
<script src="./disabled.js" />
