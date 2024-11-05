import type { MaybeRef } from 'vue';
import { inject, unref } from 'vue';
import { FormGroupKey, FormKey } from '@inkline/vue';
import { useFormElementSchema, UseFormElementSchemaOptions } from './useFormElementSchema';
import { FormValue } from '@inkline/types';
import type { UseFormValidationErrorOptions } from './useFormValidationState';

export type UseFormInputValidationOptions = UseFormElementSchemaOptions &
    Omit<UseFormValidationErrorOptions, 'schema'> & {
        shouldValidate: MaybeRef<boolean>;
    };

export function useFormInputValidation({ name, shouldValidate }: UseFormInputValidationOptions) {
    const form = inject(FormKey);
    const formGroup = inject(FormGroupKey);

    const { schema } = useFormElementSchema({ name });

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
        onInput,
        onBlur
    };
}
