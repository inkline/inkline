<script lang="ts">
import { ITextarea } from '@inkline/inkline/components';

export default {
    components: {
        ITextarea
    }
};
</script>
<template>
    <i-textarea v-model="value" color="light" placeholder="Type something.." />
    
    <i-textarea v-model="value" color="dark" placeholder="Type something.." />
</template>
<script src="./color-variants.demo.js" />
