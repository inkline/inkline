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
    methods: {
        addField () {
            this.schema.group.push(this.$inkline.form({
                value: 'Added Field',
                validators: [
                    { name: 'required' }
                ]
            }));
        },
        removeField () {
            this.schema.group.splice(0, 1);
        },
        replaceField () {
            this.schema.group.splice(0, 1, this.$inkline.form({
                value: 'Spliced Field',
                validators: [
                    { name: 'required' }
                ]
            }));
        }
    }
};
