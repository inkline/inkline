import { reactive } from 'vue';
import { FormController } from '@inkline/inkline/src/controllers';

export function useForm(schema) {
    const form = reactive(FormController.initialize(schema));

    return {
        form
    };
}
