import qs from 'qs';

export default {
    data () {
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

            const response = await fetch(`/api/users?${qs.stringify(this.params)}`);
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
