import { computed, ref } from 'vue';
import { createSchema, serializeSchema, validateSchema } from '@inkline/validation';
import type { Form, FormSchema, ResolvedFormSchema } from '@inkline/validation';

export function useForm<T extends Form = Form>(formSchema: FormSchema<T>) {
    const schema = ref(createSchema<T>(formSchema));
    const form = computed(() => serializeSchema<T>(schema.value as ResolvedFormSchema<T>));

    async function validate() {
        schema.value = await validateSchema<T>(schema.value as ResolvedFormSchema<T>);
        return schema.value;
    }

    return {
        form,
        schema,
        validate
    };
}
