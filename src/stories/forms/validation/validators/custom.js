export default {
    data () {
        return {
            form: this.$inkline.form({
                input: {
                    validators: [
                        {
                            name: 'custom',
                            message: 'Please enter a value containing "inkline".',
                            validator: (v) => /inkline/.test(v)
                        }
                    ]
                }
            })
        };
    }
};
