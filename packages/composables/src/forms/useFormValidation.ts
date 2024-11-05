import { Ref } from 'vue';
import { ResolvedFormSchema, ValidateOnEvent } from '@inkline/types';
// import { useOptions } from '../useOptions';
// import { FormGroupKey, FormKey } from '@inkline/vue';
import { UseFormGroupValidationOptions } from './useFormGroupValidation';
// import { useFormValidationEnabled } from './useFormValidationEnabled';

export type UseFormValidationOptions = UseFormGroupValidationOptions & {
    schema: Ref<ResolvedFormSchema<any>>;
    validateOn: Ref<ValidateOnEvent[] | ValidateOnEvent | undefined>;
    onUpdate?: (model: any) => void;
    onSubmit?: (model: any) => void;
};

export function useValidation(
    {
        // schema,
        // validateOn,
        // shouldValidate: shouldValidateOverride,
        // onUpdate,
        // onSubmit
    }: UseFormValidationOptions
) {
    // const form = inject(FormKey, null);
    // const formGroup = inject(FormGroupKey, null);
    //
    // const { options } = useOptions();
    // const { shouldValidate } = useFormValidationEnabled({
    //     validateOn,
    //     shouldValidateOverride
    // });
    // /**
    //  * Set the form field value and set its state as dirty
    //  * Function is called at root form level
    //  *
    //  * @param name
    //  * @param value
    //  */
    // async function setValue(name: string, value: any) {
    //     if (!options.validate?.value) {
    //         return;
    //     }
    //
    //     let resolvedSchema = clone(schema.value);
    //
    //     const targetSchema = getValueByPath(resolvedSchema, name);
    //     if (!targetSchema) {
    //         throw new Error(
    //             'Schema to be validated not found. Did you forget to match the schema key to the input "name" prop?'
    //         );
    //     }
    //
    //     resolvedSchema = setValueByPath(resolvedSchema, `${name}.value`, value);
    //     resolvedSchema = setValuesAlongPath(resolvedSchema, name, {
    //         pristine: false,
    //         dirty: true
    //     });
    //
    //     if (shouldValidate(targetSchema, 'input')) {
    //         resolvedSchema = await validateSchema(resolvedSchema);
    //     }
    //
    //     schema.value = resolvedSchema;
    //     options.onUpdate?.(resolvedSchema);
    // }
    //
    // /**
    //  * Set the form field state as touched.
    //  * Function is called at root form level
    //  *
    //  * @param name
    //  * @param event
    //  */
    // async function setTouched(name: string, event: Event) {
    //     if (!options.validate?.value) {
    //         return;
    //     }
    //
    //     let resolvedSchema = clone(schema.value);
    //
    //     const targetSchema = getValueByPath(resolvedSchema, name);
    //     if (!targetSchema) {
    //         throw new Error(
    //             'Schema to be validated not found. Did you forget to match the schema key to the input "name" prop?'
    //         );
    //     }
    //
    //     resolvedSchema = setValuesAlongPath(resolvedSchema, name, {
    //         untouched: false,
    //         touched: true
    //     });
    //
    //     if (shouldValidate(targetSchema, event.type)) {
    //         resolvedSchema = await validateSchema(resolvedSchema);
    //     }
    //
    //     schema.value = resolvedSchema;
    //     options.onUpdate?.(resolvedSchema);
    // }
    //
    // /**
    //  * Call form onSubmit callback if validation is successful.
    //  * Function is called at root form level
    //  *
    //  * @param event
    //  */
    // async function onSubmit(event: SubmitEvent) {
    //     if (!options.validate?.value) {
    //         return;
    //     }
    //
    //     let resolvedSchema = await validateSchema(schema.value);
    //
    //     resolvedSchema = setSchemaStateRecursively(resolvedSchema, {
    //         untouched: false,
    //         touched: true
    //     });
    //
    //     if (resolvedSchema.valid) {
    //         options.onSubmit?.(event);
    //     }
    //
    //     schema.value = resolvedSchema;
    //     options.onUpdate?.(resolvedSchema);
    // }
    //
    // /**
    //  * Recursively preform onInput callback for form group or form that the element
    //  * belongs to, up until the root form is reached.
    //  *
    //  * @param nameRef
    //  * @param value
    //  */
    // async function onInput(nameRef: Ref<string | undefined>, value: any) {
    //     const name = unref(nameRef);
    //
    //     if (!options.validate?.value || !name) {
    //         return;
    //     }
    //
    //     if (formGroup) {
    //         formGroup.onInput(name, value);
    //     } else if (form) {
    //         form.onInput(name, value);
    //     } else if (options.schema?.value) {
    //         await setValue(name, value);
    //     }
    // }
    //
    // /**
    //  * Recursively preform onBlur callback for form group or form that the element
    //  * belongs to, up until the root form is reached.
    //  *
    //  * @param nameRef
    //  * @param event
    //  */
    // function onBlur(nameRef: Ref<string | undefined>, event: any) {
    //     const name = unref(nameRef);
    //
    //     if (!options.validate?.value || !name) {
    //         return;
    //     }
    //
    //     if (formGroup) {
    //         formGroup.onBlur(name, event);
    //     } else if (form) {
    //         form.onBlur(name, event);
    //     } else if (options.schema?.value) {
    //         setTouched(name, event);
    //     }
    // }
    //
    // return { schema, onSubmit, onInput, onBlur };
}
