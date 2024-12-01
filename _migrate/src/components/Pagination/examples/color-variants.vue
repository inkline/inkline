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
    <Pagination
        v-model="page"
        :items-total="itemsTotal"
        :items-per-page="itemsPerPage"
        color="light"
    />

    <Pagination
        v-model="page"
        :items-total="itemsTotal"
        :items-per-page="itemsPerPage"
        color="dark"
    />
</template>
