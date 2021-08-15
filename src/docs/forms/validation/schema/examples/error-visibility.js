export default {
    data () {
        return {
            schema: this.$inkline.form({
                input: {
                    validators: [
                        { name: 'minLength', value: 5 }
                    ]
                }
            })
        };
    }
};
