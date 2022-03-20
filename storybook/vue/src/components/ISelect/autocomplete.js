export default {
    data () {
        const defaultOptions = [
            { id: 1, label: 'Richard Hendricks' },
            { id: 2, label: 'Bertram Gilfoyle' },
            { id: 3, label: 'Dinesh Chugtai' },
            { id: 4, label: 'Jared Dunn' },
            { id: 5, label: 'Erlich Bachman' }
        ];

        return {
            selected: null,
            options: defaultOptions,
            defaultOptions
        };
    },
    methods: {
        onSearch (query) {
            this.options = this.defaultOptions
                .filter((option) => {
                    return option.label.toLowerCase().includes((query || '').toLowerCase());
                });
        }
    }
};
