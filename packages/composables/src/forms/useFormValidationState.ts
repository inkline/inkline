import { computed, inject, unref } from 'vue';
import type { MaybeRef } from 'vue';
import type { FormState, ResolvedFormField, ResolvedFormSchema } from '@inkline/types';
import { FormGroupKey, FormKey } from '@inkline/vue';

export type UseFormValidationErrorOptions = {
    schema: MaybeRef<ResolvedFormSchema<any> | ResolvedFormField<any> | undefined>;
    disabled: MaybeRef<boolean>;
    readonly: MaybeRef<boolean>;
    errorCondition: MaybeRef<boolean | string[] | undefined>;
};

export function useFormValidationState({
    schema,
    disabled,
    readonly,
    errorCondition
}: UseFormValidationErrorOptions) {
    const form = inject(FormKey, null);
    const formGroup = inject(FormGroupKey, null);

    const hasError = computed(() => {
        const currentSchema = unref(schema);
        const currentErrorCondition = unref(errorCondition);
        const currentFormErrorCondition = unref(form?.errorCondition);
        const currentFormGroupErrorCondition = unref(formGroup?.errorCondition);
        const condition =
            currentErrorCondition ||
            currentFormErrorCondition ||
            currentFormGroupErrorCondition ||
            [];

        if (typeof condition === 'boolean') {
            return condition;
        } else if (currentSchema) {
            return condition.reduce((acc, status) => {
                return Boolean(acc && currentSchema?.[status as keyof FormState]);
            }, true);
        }

        return false;
    });

    const isDisabled = computed(
        () => !!(unref(disabled) || unref(formGroup?.disabled) || unref(form?.disabled))
    );
    const isReadonly = computed(
        () => !!(unref(readonly) || unref(formGroup?.readonly) || unref(form?.readonly))
    );

    return { hasError, isReadonly, isDisabled };
}
