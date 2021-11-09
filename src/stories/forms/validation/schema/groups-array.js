export default {
    data () {
        return {
            schema: this.$inkline.form({
                group: [
                    {
                        validators: [
                            { name: 'required' }
                        ]
                    },
                    {
                        validators: ['required']
                    }
                ]
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
