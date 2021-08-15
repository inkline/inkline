export default {
    data () {
        return {
            form: this.$inkline.form({
                input: {
                    validators: [
                        { name: 'number' }
                    ]
                },
                inputNegative: {
                    validators: [
                        { name: 'number', allowNegative: true }
                    ]
                },
                inputNegativeDecimal: {
                    validators: [
                        { name: 'number', allowNegative: true, allowDecimal: true }
                    ]
                }
            })
        };
    }
};
