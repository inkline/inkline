export default {
    data () {
        return {
            schema: this.$inkline.form({
                group: {
                    firstName: {
                        validators: [
                            { name: 'required' }
                        ]
                    },
                    lastName: {
                        validators: ['required']
                    }
                }
            })
        };
    },
    methods: {
        setEmail () {
            this.schema.group.email = this.$inkline.form({
                validators: [
                    { name: 'email' }
                ]
            });
        },
        setAddress () {
            this.schema.group.address = this.$inkline.form({
                value: '32 Inkline St.'
            });
        }
    }
};
