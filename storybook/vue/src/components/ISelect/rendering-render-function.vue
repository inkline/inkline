<script lang="ts">
import { ISelect } from '@inkline/inkline/components';

export default {
    components: {
        ISelect
    }
};
</script>
<template>
    <i-select
        v-model="selected"
        :options="options"
        :label="renderLabel"
        placeholder="Choose something.."
    />
</template>
<script src="./rendering-render-function.js" />
