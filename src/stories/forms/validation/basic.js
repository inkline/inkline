export default {
    data () {
        return {
            schema: this.$inkline.form({
                group1: {
                    input1: {
                        value: 'G1 example 1',
                        validators: [
                            { name: 'required' }
                        ]
                    }
                },
                group2: {
                    input1: {
                        value: 'alex@grozav.com',
                        validators: [
                            { name: 'required' },
                            { name: 'email' }
                        ]
                    },
                    group1: {
                        input1: {
                            value: 'G2 G1',
                            validators: [
                                'required',
                                { name: 'maxLength', value: 5 }
                            ]
                        }
                    }
                },
                group3: [
                    {
                        value: 'G3 example 0'
                    },
                    {
                        value: 'G3 example 1'
                    }
                ],
                form4: {
                    group1: {
                        input1: {
                            value: 'F4 G1 example 3'
                        }
                    }
                },
                group5: {
                    input1: {
                        value: 'G5 example 1'
                    },
                    group1: {
                        input1: {
                            value: 'G5 G1 example 3'
                        }
                    }
                }
            })
        };
    },
    methods: {
        onSubmit () {
            alert('Submitted!');
        },
        addRow () {
            this.schema.group3.push(this.$inkline.form({
                value: `G3 example ${this.schema.group3.length}`
            }));
        },
        setRow () {
            this.schema.group5.example = this.$inkline.form({});
        }
    }
};
