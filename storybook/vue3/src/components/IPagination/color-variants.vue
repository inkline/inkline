<script lang="ts">
import { IPagination } from '@inkline/inkline/components';

export default {
    components: {
        IPagination
    }
};
</script>
<template>
    <i-pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" color="light" />
    
    <i-pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" color="dark" />
</template>
<script src="./color-variants.js" />
