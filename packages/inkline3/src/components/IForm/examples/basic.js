export default {
    data () {
        return {
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',
            input6: '',
            textarea: '',
            select: '',
            checkbox: ['Football'],
            radio: 'Decline',

            schema: {
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
                        value: 'G2 example 1',
                        validators: [
                            { name: 'required' },
                            { name: 'email' }
                        ]
                    },
                    group1: {
                        input1: {
                            value: 'G2 G1 example 3',
                            validators: [
                                'required',
                                { name: 'maxLength', value: 5 }
                            ]
                        }
                    }
                },
                group3: [
                    {
                        value: 'G3 example 1'
                    },
                    {
                        value: 'G3 example 3'
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
                },
            }
        };
    },
    methods: {
        onSubmit() {
            alert('Submitted!');
        }
    }
}
