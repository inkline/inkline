export default {
    data () {
        return {
            form: this.$inkline.form({
                input: {
                    validators: [
                        { name: 'required' }
                    ]
                }
            })
        };
    }
};
