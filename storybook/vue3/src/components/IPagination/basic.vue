<script lang="ts">
import { IPagination } from '@inkline/inkline/components';

export default {
    components: {
        IPagination
    }
};
</script>
<template>
    <i-pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" />
</template>
<script src="./basic.js" />
