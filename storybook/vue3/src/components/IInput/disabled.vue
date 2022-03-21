<script lang="ts">
import { IInput } from '@inkline/inkline/components';

export default {
    components: {
        IInput
    }
};
</script>
<template>
    <i-input v-model="value" disabled placeholder="Type something.." />
</template>
<script src="./disabled.js" />
