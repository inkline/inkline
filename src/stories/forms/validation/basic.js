export default {
    data () {
        return {
            form: this.$inkline.form({
                username: {
                    validators: ['required']
                },
                password: {
                    validators: ['required']
                }
            })
        };
    },
    methods: {
        onSubmit () {
            alert('Form submitted');
        }
    }
};
