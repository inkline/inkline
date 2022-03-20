<script lang="ts">
import { IInput } from '@inkline/inkline/components';

export default {
    components: {
        IInput
    }
};
</script>
<template>
    <i-input v-model="value" size="sm" placeholder="Type something.." />
    
    <i-input v-model="value" size="md" placeholder="Type something.." />
    
    <i-input v-model="value" size="lg" placeholder="Type something.." />
</template>
<script src="./size-variants.demo.js" />
