<script lang="ts">
import { INumberInput } from '@inkline/inkline/components';

export default {
    components: {
        INumberInput
    }
};
</script>
<template>
    <i-number-input v-model="value" readonly placeholder="Enter a number.." />
</template>
<script src="./readonly.js" />
