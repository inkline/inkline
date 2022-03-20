<script lang="ts">
import { IToggle } from '@inkline/inkline/components';

export default {
    components: {
        IToggle
    }
};
</script>
<template>
    <i-toggle v-model="toggled">I accept the terms and conditions</i-toggle>
</template>
<script src="./basic.js" />
