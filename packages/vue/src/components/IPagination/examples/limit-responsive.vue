<script>
export default {
    data() {
        return {
            page: 1,
            itemsPerPage: 20,
            itemsTotal: 300,
            limitResponsive: {
                xs: 3,
                sm: 3
            }
        };
    }
};
</script>
<template>
    <IPagination
        v-model="page"
        :limit="limitResponsive"
        :items-total="itemsTotal"
        :items-per-page="itemsPerPage"
    />
</template>
