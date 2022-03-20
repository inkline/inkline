<script lang="ts">
import { ITextarea } from '@inkline/inkline/components';

export default {
    components: {
        ITextarea
    }
};
</script>
<template>
    <i-textarea v-model="value" disabled placeholder="Type something.." />
</template>
<script src="./disabled.js" />
