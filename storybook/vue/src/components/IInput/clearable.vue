<script lang="ts">
import { IInput } from '@inkline/inkline/components';

export default {
    components: {
        IInput
    }
};
</script>
<template>
    <i-input v-model="value" clearable placeholder="Type something.." />
</template>
<script src="./clearable.js" />
