<script lang="ts">
import { IToggle } from '@inkline/inkline/components';

export default {
    components: {
        IToggle
    }
};
</script>
<template>
    <i-toggle v-model="toggled" disabled>I accept the terms and conditions</i-toggle>
</template>
<script src="./disabled.js" />
