import { useForm } from '@inkline/inkline/composables';

export default {
    setup() {
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
        onSubmit() {
            alert('Form submitted');
        }
    }
};
