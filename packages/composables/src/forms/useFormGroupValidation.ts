import { inject, MaybeRef, Ref, unref } from 'vue';
import { FormGroupKey, FormKey } from '@inkline/vue';
import { useFormElementSchema } from './useFormElementSchema';
import type { UseFormElementSchemaOptions } from './useFormElementSchema';
import type { UseFormValidationErrorOptions } from './useFormValidationState';
import { useFormValidationState } from './useFormValidationState';

export type UseFormGroupValidationOptions = UseFormElementSchemaOptions &
    Omit<UseFormValidationErrorOptions, 'schema'> & {
        shouldValidate: MaybeRef<boolean>;
    };

export function useFormGroupValidation({
    name,
    disabled,
    readonly,
    errorCondition,
    shouldValidate
}: UseFormGroupValidationOptions) {
    const form = inject(FormKey);
    const formGroup = inject(FormGroupKey);

    const { schema } = useFormElementSchema({ name });
    const { isDisabled, isReadonly, hasError } = useFormValidationState({
        schema,
        disabled,
        readonly,
        errorCondition
    });

    /**
     * Recursively preform onInput callback for form group or form that the element
     * belongs to, up until the root form is reached.
     *
     * @param inputName
     * @param value
     */
    function onInput(inputName: MaybeRef<string | undefined>, value: any) {
        const formInputName = unref(inputName);
        const formShouldValidate = unref(shouldValidate);

        if (!formShouldValidate || !formInputName) {
            return;
        }

        if (formGroup) {
            formGroup.onInput(formInputName, value);
        } else if (form) {
            form.onInput(formInputName, value);
        }
    }

    /**
     * Recursively preform onBlur callback for form group or form that the element
     * belongs to, up until the root form is reached.
     *
     * @param inputName
     * @param event
     */
    function onBlur(inputName: Ref<string | undefined>, event: FocusEvent) {
        const formInputName = unref(inputName);
        const formShouldValidate = unref(shouldValidate);

        if (!formShouldValidate || !formInputName) {
            return;
        }

        if (formGroup) {
            formGroup.onBlur(formInputName, event);
        } else if (form) {
            form.onBlur(formInputName, event);
        }
    }

    return {
        schema,
        hasError,
        isDisabled,
        isReadonly,
        onInput,
        onBlur
    };
}
