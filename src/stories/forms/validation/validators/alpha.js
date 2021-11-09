export default {
    data () {
        return {
            form: this.$inkline.form({
                input: {
                    validators: [
                        { name: 'alpha' }
                    ]
                },
                inputSpaces: {
                    validators: [
                        { name: 'alpha', allowSpaces: true }
                    ]
                },
                inputDashes: {
                    validators: [
                        { name: 'alpha', allowDashes: true }
                    ]
                }
            })
        };
    }
};
