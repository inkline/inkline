export default {
    data () {
        return {
            form: this.$inkline.form({
                input: {
                    validators: [
                        { name: 'alphanumeric' }
                    ]
                },
                inputSpaces: {
                    validators: [
                        { name: 'alphanumeric', allowSpaces: true }
                    ]
                },
                inputDashes: {
                    validators: [
                        { name: 'alphanumeric', allowDashes: true }
                    ]
                }
            })
        };
    }
};
