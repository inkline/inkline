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
        placeholder="Choose something.."
        readonly
    />
</template>
<script src="./readonly.js" />
