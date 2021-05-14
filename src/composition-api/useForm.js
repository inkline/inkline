import { reactive } from 'vue';
import { initialize } from '@inkline/inkline/src/validation';

export function useForm(schema) {
    const form = reactive(initialize(schema));

    return {
        form
    };
}
