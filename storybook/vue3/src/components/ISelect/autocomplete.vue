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
        autocomplete
        placeholder="Choose something.."
        @search="onSearch"
    />
</template>
<script src="./autocomplete.js" />
