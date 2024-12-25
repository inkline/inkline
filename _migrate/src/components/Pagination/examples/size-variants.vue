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
    <Pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" size="sm" />

    <Pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" size="md" />

    <Pagination v-model="page" :items-total="itemsTotal" :items-per-page="itemsPerPage" size="lg" />
</template>
