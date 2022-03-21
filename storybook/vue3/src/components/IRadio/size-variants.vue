<script lang="ts">
import { IRadio } from '@inkline/inkline/components';

export default {
    components: {
        IRadio
    }
};
</script>
<template>
    <i-radio-group v-model="checked">
        <i-radio value="small" size="sm">Small</i-radio>
        <i-radio value="medium" size="md">Medium</i-radio>
        <i-radio value="large" size="lg">Large</i-radio>
    </i-radio-group>
</template>
<script src="./size-variants.js" />
