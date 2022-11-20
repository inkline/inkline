<script>
export default {
    data() {
        return {
            page: 1,
            itemsPerPage: 20,
            itemsTotal: 300
        };
    }
};
</script>
<template>
    <i-pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" size="sm" />
    
    <i-pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" size="md" />
    
    <i-pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" size="lg" />
</template>
