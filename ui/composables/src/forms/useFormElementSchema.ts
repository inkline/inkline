import { computed, MaybeRef, unref } from 'vue';
import { getValueByPath } from '@inkline/utils';
import type { ResolvedFormField, ResolvedFormSchema } from '@inkline/types';
import { useInjectForm } from './useInjectForm';

export type UseFormElementSchemaOptions = {
    name: MaybeRef<string | undefined>;
};

export function useFormElementSchema({ name }: UseFormElementSchemaOptions) {
    const { form } = useInjectForm();

    /**
     * Get the schema for the current input element by name.
     */
    const schema = computed(() => {
        const formName = unref(name);
        const formSchema = unref(form?.schema);

        if (formSchema && formName) {
            return getValueByPath<ResolvedFormField<any>, ResolvedFormSchema<any>>(
                formSchema,
                formName
            );
        }
    });

    return {
        schema
    };
}
