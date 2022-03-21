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
        :total="total"
        :label="renderLabel"
        :loading="loading"
        autocomplete
        placeholder="Choose something.."
        @search="onSearch"
        @pagination="onPagination"
    />
</template>
<script src="./advanced.js" />
