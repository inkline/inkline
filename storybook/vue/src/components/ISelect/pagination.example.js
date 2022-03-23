export default {
    data () {
        return {
            selected: null,
            loading: false,
            options: [],
            total: 0,
            params: {
                page: 1,
                rowsPerPage: 25,
                query: ''
            }
        };
    },
    methods: {
        async fetchOptions () {
            this.loading = true;

            const query = new URLSearchParams(this.params).toString();
            const response = await fetch(`/api/users?${query}`);
            const { items, total } = await response.json();

            if (this.params.page === 1) {
                this.options = items;
            } else {
                this.options = this.options.concat(items);
            }

            this.total = total;
            this.loading = false;
        },
        async onPagination () {
            this.params.page += 1;

            await this.fetchOptions();
        },
        renderLabel (option) {
            return option ? `${option.firstName} ${option.lastName}` : '';
        }
    },
    mounted () {
        this.fetchOptions();
    }
};
