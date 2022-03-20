<script lang="ts">
import { ITextarea } from '@inkline/inkline/components';

export default {
    components: {
        ITextarea
    }
};
</script>
<template>
    <i-textarea v-model="value" size="sm" placeholder="Type something.." />
    
    <i-textarea v-model="value" size="md" placeholder="Type something.." />
    
    <i-textarea v-model="value" size="lg" placeholder="Type something.." />
</template>
<script src="./size-variants.demo.js" />
