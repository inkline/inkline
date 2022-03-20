<script lang="ts">
import { IPagination } from '@inkline/inkline/components';

export default {
    components: {
        IPagination
    }
};
</script>
<template>
    <i-pagination v-model="page" :limit="3" :items-total="itemsTotal" :items-per-page="itemsPerPage" />
</template>
<script src="./limit.js" />
