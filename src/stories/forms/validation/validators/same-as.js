export default {
    data () {
        return {
            form: this.$inkline.form({
                password: {
                    validators: [
                        { name: 'required' }
                    ]
                },
                passwordConfirmation: {
                    validators: [
                        { name: 'sameAs', target: 'password', schema: () => this.form }
                    ]
                }
            })
        };
    }
};
