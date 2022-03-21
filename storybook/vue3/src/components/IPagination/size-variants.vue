<script lang="ts">
import { IPagination } from '@inkline/inkline/components';

export default {
    components: {
        IPagination
    }
};
</script>
<template>
    <i-pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" size="sm" />
    
    <i-pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" size="md" />
    
    <i-pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" size="lg" />
</template>
<script src="./size-variants.js" />
