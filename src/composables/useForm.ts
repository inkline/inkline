import { computed, ref } from 'vue';
import { initializeSchema, serializeSchema, validateSchema } from '@inkline/inkline/validation';

export function useForm<T>(formDefinition: T) {
    const schema = ref(initializeSchema(formDefinition));
    const form = computed(() => serializeSchema(schema.value));

    function validate() {
        schema.value = validateSchema(schema.value);
    }

    return {
        schema,
        validate
    };
}
