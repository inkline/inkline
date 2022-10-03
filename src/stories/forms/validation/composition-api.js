import { useForm } from '@inkline/inkline/composition-api';

export default {
    setup () {
        const schema = {
            username: {
                validators: ['required']
            },
            password: {
                validators: ['required']
            }
        };
        const form = useForm(schema);

        return {
            form
        };
    },
    methods: {
        onSubmit () {
            alert('Form submitted');
        }
    }
};
