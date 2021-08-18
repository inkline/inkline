export default {
    data () {
        return {
            schema: this.$inkline.form({
                input: {
                    validateOn: 'input',
                    validators: [
                        { name: 'minLength', value: 5 }
                    ]
                }
            })
        };
    }
};
