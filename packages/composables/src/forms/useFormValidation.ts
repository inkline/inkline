import { MaybeRef, Ref, unref } from 'vue';
import { FormValue, ResolvedFormField, ResolvedFormSchema, ValidateOnEvent } from '@inkline/types';
import { UseFormGroupValidationOptions } from './useFormGroupValidation';
import { useFormValidationEnabled } from './useFormValidationEnabled';
import { useInjectForm } from './useInjectForm';
import { clone, getValueByPath, setValueByPath, setValuesAlongPath } from '@inkline/utils';
import { setSchemaStateRecursively, validateSchema } from '@inkline/validation';
import { useFormValidationState } from './useFormValidationState';

export type UseFormValidationOptions = Omit<UseFormGroupValidationOptions, 'name'> & {
    schema: Ref<ResolvedFormSchema<any> | undefined>;
    validateOn: MaybeRef<ValidateOnEvent[] | ValidateOnEvent | undefined>;
    onUpdate?: (schema: ResolvedFormSchema<any>) => void;
    onSubmit?: (event: SubmitEvent) => void;
};

export function useFormValidation({
    schema,
    disabled,
    readonly,
    errorCondition,
    validateOn,
    shouldValidate: shouldValidateOverride,
    ...callbacks
}: UseFormValidationOptions) {
    const { form, formGroup } = useInjectForm();
    const { shouldValidate } = useFormValidationEnabled({
        validateOn,
        shouldValidateOverride
    });
    const { isDisabled, isReadonly, hasError } = useFormValidationState({
        schema,
        disabled,
        readonly,
        errorCondition
    });

    /**
     * Set the form field value and set its state as dirty
     * Function is called at root form level
     *
     * @param name
     * @param value
     */
    async function setValue(name: string, value: FormValue) {
        const schemaValue = unref(schema);
        if (!schemaValue) {
            return;
        }

        let resolvedSchema = clone(schemaValue);

        const targetSchema: ResolvedFormField<unknown> = getValueByPath(resolvedSchema, name);
        if (!targetSchema) {
            throw new Error(
                'Schema to be validated not found. Did you forget to match the schema key to the input "name" prop?'
            );
        }

        resolvedSchema = setValueByPath(resolvedSchema, `${name}.value`, value);
        resolvedSchema = setValuesAlongPath(resolvedSchema, name, {
            pristine: false,
            dirty: true
        });

        if (shouldValidate.value.input) {
            resolvedSchema = await validateSchema(resolvedSchema);
        }

        schema.value = resolvedSchema;
        callbacks.onUpdate?.(resolvedSchema);
    }

    /**
     * Set the form field state as touched.
     * Function is called at root form level
     *
     * @param name
     * @param event
     */
    async function setTouched(name: string, event: FocusEvent) {
        const schemaValue = unref(schema);
        if (!schemaValue) {
            return;
        }

        let resolvedSchema = clone(schemaValue);

        const targetSchema: ResolvedFormField<unknown> = getValueByPath(resolvedSchema, name);
        if (!targetSchema) {
            throw new Error(
                'Schema to be validated not found. Did you forget to match the schema key to the input "name" prop?'
            );
        }

        resolvedSchema = setValuesAlongPath(resolvedSchema, name, {
            untouched: false,
            touched: true
        });

        if (shouldValidate.value[event.type]) {
            resolvedSchema = await validateSchema(resolvedSchema);
        }

        schema.value = resolvedSchema;
        callbacks.onUpdate?.(resolvedSchema);
    }

    /**
     * Call form onSubmit callback if validation is successful.
     * Function is called at root form level
     *
     * @param event
     */
    async function onSubmit(event: SubmitEvent) {
        const schemaValue = unref(schema);
        if (!schemaValue) {
            return;
        }

        let resolvedSchema = await validateSchema(schemaValue);

        resolvedSchema = setSchemaStateRecursively(resolvedSchema, {
            untouched: false,
            touched: true
        });

        if (resolvedSchema.valid) {
            callbacks.onSubmit?.(event);
        }

        schema.value = resolvedSchema;
        callbacks.onUpdate?.(resolvedSchema);
    }

    /**
     * Recursively preform onInput callback for form group or form that the element
     * belongs to, up until the root form is reached.
     *
     * @param nameRef
     * @param value
     */
    async function onInput(nameRef: MaybeRef<string | undefined>, value: FormValue) {
        const name = unref(nameRef);
        if (!name) {
            return;
        }

        if (formGroup) {
            formGroup.onInput(name, value);
        } else if (form) {
            form.onInput(name, value);
        } else if (schema?.value) {
            await setValue(name, value);
        }
    }

    /**
     * Recursively preform onBlur callback for form group or form that the element
     * belongs to, up until the root form is reached.
     *
     * @param nameRef
     * @param event
     */
    async function onBlur(nameRef: MaybeRef<string | undefined>, event: FocusEvent) {
        const name = unref(nameRef);
        if (!name) {
            return;
        }

        if (formGroup) {
            formGroup.onBlur(name, event);
        } else if (form) {
            form.onBlur(name, event);
        } else if (schema?.value) {
            await setTouched(name, event);
        }
    }

    return {
        schema,
        hasError,
        isDisabled,
        isReadonly,
        onSubmit,
        onInput,
        onBlur
    };
}
