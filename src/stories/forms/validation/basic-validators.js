export default {
    data () {
        return {
            form: this.$inkline.form({
                username: {
                    validators: [
                        {
                            name: 'required'
                        }
                    ]
                },
                password: {
                    validators: [
                        {
                            name: 'required'
                        },
                        {
                            name: 'minLength',
                            value: 8
                        },
                        {
                            name: 'custom', // lowercase
                            message: 'Please enter at least one lowercase character.',
                            validator: (v) => /[a-z]/.test(v)
                        },
                        {
                            name: 'custom', // uppercase
                            message: 'Please enter at least one uppercase character.',
                            validator: (v) => /[A-Z]/.test(v)
                        },
                        {
                            name: 'custom', // numeric
                            message: 'Please enter at least one numeric character.',
                            validator: (v) => /[0-9]/.test(v)
                        },
                        {
                            name: 'custom', // symbol
                            message: 'Please enter at least one symbol.',
                            validator: (v) => /[^a-zA-Z0-9]/.test(v)
                        }
                    ]
                }
            })
        };
    }
};
