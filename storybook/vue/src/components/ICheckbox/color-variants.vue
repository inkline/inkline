<script lang="ts">
import { ICheckbox } from '@inkline/inkline/components';

export default {
    components: {
        ICheckbox
    }
};
</script>
<template>
    <i-checkbox v-model="checked" color="light">Light</i-checkbox>
    
    <i-checkbox v-model="checked" color="dark">Dark</i-checkbox>
</template>
<script src="./color-variants.demo.js" />
