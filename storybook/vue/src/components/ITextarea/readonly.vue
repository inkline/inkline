<script lang="ts">
import { ITextarea } from '@inkline/inkline/components';

export default {
    components: {
        ITextarea
    }
};
</script>
<template>
    <i-textarea v-model="value" readonly placeholder="Type something.." />
</template>
<script src="./readonly.js" />
