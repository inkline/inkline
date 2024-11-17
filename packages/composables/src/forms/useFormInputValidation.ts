import type { MaybeRef } from 'vue';
import { unref } from 'vue';
import { useFormElementSchema, UseFormElementSchemaOptions } from './useFormElementSchema';
import { FormValue } from '@inkline/types';
import { UseFormValidationErrorOptions, useFormValidationState } from './useFormValidationState';
import { useInjectForm } from './useInjectForm';

export type UseFormInputValidationOptions = UseFormElementSchemaOptions &
    Omit<UseFormValidationErrorOptions, 'schema'> & {
        shouldValidate: MaybeRef<boolean>;
    };

export function useFormInputValidation({
    name,
    disabled,
    readonly,
    errorCondition,
    shouldValidate
}: UseFormInputValidationOptions) {
    const { form, formGroup } = useInjectForm();

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
     * @param value
     */
    function onInput(value: FormValue) {
        const formShouldValidate = unref(shouldValidate);
        const formName = unref(name);

        if (!formShouldValidate || !formName) {
            return;
        }

        if (formGroup) {
            formGroup.onInput(formName, value);
        } else if (form) {
            form.onInput(formName, value);
        }
    }

    /**
     * Recursively preform onBlur callback for form group or form that the element
     * belongs to, up until the root form is reached.
     *
     * @param event
     */
    function onBlur(event: FocusEvent) {
        const formShouldValidate = unref(shouldValidate);
        const formName = unref(name);

        if (!formShouldValidate || !formName) {
            return;
        }

        if (formGroup) {
            formGroup.onBlur(formName, event);
        } else if (form) {
            form.onBlur(formName, event);
        }
    }

    return {
        schema,
        isDisabled,
        isReadonly,
        hasError,
        onInput,
        onBlur
    };
}
