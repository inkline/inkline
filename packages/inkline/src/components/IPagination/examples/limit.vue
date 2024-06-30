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
    <IPagination
        v-model="page"
        :limit="3"
        :items-total="itemsTotal"
        :items-per-page="itemsPerPage"
    />
</template>
