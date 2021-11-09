export default {
    data () {
        return {
            schema: this.$inkline.form({
                group: {
                    input1: {
                        validators: [
                            { name: 'required' }
                        ]
                    },
                    input2: {
                        validators: ['required']
                    }
                }
            })
        };
    },
    computed: {
        groupValidationStatus () {
            return this.schema.group.dirty
                ? this.schema.group.invalid ? 'Invalid' : 'Valid'
                : 'Pending';
        }
    }
};
