<script>
export default {
    data() {
        return {
            selected: null,
            loading: false,
            options: [],
            params: {
                query: ''
            }
        };
    },
    methods: {
        async fetchOptions() {
            this.loading = true;

            const query = new URLSearchParams(this.params).toString();
            const response = await fetch(`/api/users?${query}`);
            const { items } = await response.json();

            this.options = items;
            this.loading = false;
        },
        async onSearch(query) {
            if (query === '' || query === this.renderLabel(this.selected)) {
                return;
            }

            this.params.query = query;

            await this.fetchOptions();
        },
        renderLabel(option) {
            return option ? `${option.firstName} ${option.lastName}` : '';
        }
    },
    mounted() {
        this.fetchOptions();
    }
};
</script>
<template>
    <i-select
        v-model="selected"
        :options="options"
        :label="renderLabel"
        :loading="loading"
        autocomplete
        placeholder="Choose something.."
        @search="onSearch"
    />
</template>
