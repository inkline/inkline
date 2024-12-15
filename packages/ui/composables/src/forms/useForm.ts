import { computed, Ref, ref } from 'vue';
import { createSchema, serializeSchema, validateSchema } from '@inkline/validation';
import { Form, FormSchema, ResolvedFormSchema } from '@inkline/types';

export function useForm<T extends Form = Form>(formSchema: FormSchema<T>) {
    const resolvedSchema = createSchema<T>(formSchema);
    const schema = ref(resolvedSchema) as Ref<ResolvedFormSchema<T>>;
    const form = computed(() => serializeSchema<T>(schema.value));

    async function validate() {
        schema.value = await validateSchema<T>(schema.value);
        return schema.value;
    }

    return {
        form,
        schema,
        validate
    };
}
