<script lang="ts">
import { IToggle } from '@inkline/inkline/components';

export default {
    components: {
        IToggle
    }
};
</script>
<template>
    <i-toggle v-model="toggled" size="sm">I accept the terms and conditions</i-toggle>
    
    <i-toggle v-model="toggled" size="md">I accept the terms and conditions</i-toggle>
    
    <i-toggle v-model="toggled" size="lg">I accept the terms and conditions</i-toggle>
</template>
<script src="./size-variants.demo.js" />
