import { computed, Ref, ref } from 'vue';
import { createSchema, serializeSchema, validateSchema } from '@inkline/inkline/validation';
import { Form, FormSchema, ResolvedFormSchema } from '@inkline/inkline/types';

export function useForm<T extends Form>(formSchema: FormSchema<T>) {
    const schema = ref(createSchema<T>(formSchema)) as Ref<ResolvedFormSchema<T>>;
    const form = computed(() => serializeSchema<T>(schema.value));

    async function validate() {
        schema.value = await validateSchema(schema.value);
    }

    return {
        form,
        schema,
        validate
    };
}
