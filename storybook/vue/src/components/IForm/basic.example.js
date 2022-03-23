export default {
    data () {
        return {
            input: '',
            textarea: '',
            select: null,
            options: [
                { id: 1, label: 'Option A' },
                { id: 2, label: 'Option B' },
                { id: 3, label: 'Option C' }
            ],
            checkboxGroup: ['apple'],
            radioGroup: 'coconut',
            checkbox: true,
            toggle: true,
            loading: false
        };
    },
    methods: {
        onSubmit () {
            this.loading = true;

            setTimeout(() => {
                this.loading = false;
            }, 2000);
        }
    }
};
