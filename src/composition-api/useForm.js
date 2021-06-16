import { reactive } from 'vue';
import { initialize } from '@inkline/inkline/src/validation';

export function useForm(rawSchema) {
    const schema = initialize(rawSchema);
    const form = reactive(schema);

    return {
        form
    };
}
