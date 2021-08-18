import { reactive } from 'vue';
import { initialize } from '../validation';
export function useForm(rawSchema) {
    const schema = initialize(rawSchema);
    const form = reactive(schema);
    return {
        form
    };
}
//# sourceMappingURL=useForm.js.map