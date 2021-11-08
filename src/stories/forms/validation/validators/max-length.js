export default {
    data () {
        return {
            form: this.$inkline.form({
                input: {
                    validators: [
                        { name: 'maxLength', value: 12 }
                    ]
                }
            })
        };
    }
};
