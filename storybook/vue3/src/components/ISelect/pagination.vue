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
        placeholder="Choose something.."
        @pagination="onPagination"
    />
</template>
<script src="./pagination.js" />
