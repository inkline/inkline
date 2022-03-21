<script lang="ts">
import { IInput } from '@inkline/inkline/components';

export default {
    components: {
        IInput
    }
};
</script>
<template>
    <i-input v-model="value" color="light" placeholder="Type something.." />
    
    <i-input v-model="value" color="dark" placeholder="Type something.." />
</template>
<script src="./color-variants.demo.js" />
