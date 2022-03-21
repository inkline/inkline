<script lang="ts">
import { ICheckbox } from '@inkline/inkline/components';

export default {
    components: {
        ICheckbox
    }
};
</script>
<template>
    <i-checkbox v-model="checked" size="sm">Small</i-checkbox>
    
    <i-checkbox v-model="checked" size="md">Medium</i-checkbox>
    
    <i-checkbox v-model="checked" size="lg">Large</i-checkbox>
</template>
<script src="./size-variants.demo.js" />
