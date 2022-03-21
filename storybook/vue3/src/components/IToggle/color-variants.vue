<script lang="ts">
import { IToggle } from '@inkline/inkline/components';

export default {
    components: {
        IToggle
    }
};
</script>
<template>
    <i-toggle v-model="toggled" color="light">I accept the terms and conditions</i-toggle>
    
    <i-toggle v-model="toggled" color="dark">I accept the terms and conditions</i-toggle>
</template>
<script src="./color-variants.demo.js" />
