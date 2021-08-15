export default {
    data () {
        return {
            schema: this.$inkline.form({
                input: {
                    validators: [
                        { name: 'required', message: 'This field is required' }
                    ]
                }
            })
        };
    }
};
