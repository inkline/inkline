import { computed, inject, Ref } from 'vue';
import { FormKey } from '@inkline/inkline';
import { getValueByPath } from '@inkline/utils';

export type UseFormInputValidationOptions = {
    name: Ref<string | undefined>;
    shouldValidate: Ref<boolean>;
};

export function useFormInputValidation({ name, shouldValidate }: UseFormInputValidationOptions) {
    const form = inject(FormKey);

    const schema = computed(() => {
        if (form?.schema && shouldValidate.value && name.value) {
            return getValueByPath(form.schema.value, name.value);
        }
    });

    return {
        schema
    };
}
