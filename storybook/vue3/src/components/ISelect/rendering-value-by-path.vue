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
        label="address.city"
        placeholder="Choose something.."
    />
</template>
<script src="./rendering-value-by-path.js" />
