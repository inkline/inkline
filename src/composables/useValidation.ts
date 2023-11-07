import { clone, getValueByPath, setValueByPath, setValuesAlongPath } from '@grozav/utils';
import type { Ref } from 'vue';
import { computed, inject, ref, unref, watch } from 'vue';
import { FormKey, FormGroupKey } from '@inkline/inkline/constants';
import { setSchemaStateRecursively, validateSchema } from '@inkline/inkline/validation';
import { useInkline } from '@inkline/inkline/composables/useInkline';

export function useValidation(options: {
    name?: Ref<string>;
    validate?: Ref<boolean>;
    schema?: Ref;
    onUpdate?: (model: any) => void;
    onSubmit?: (model: any) => void;
}) {
    const inkline = useInkline();

    const form = inject(FormKey, null);
    const formGroup = inject(FormGroupKey, null);

    const schema = form
        ? computed(
              () =>
                  form.schema &&
                  options.validate?.value &&
                  getValueByPath(form.schema.value, options.name!.value)
          )
        : ref<any | null>(options.schema?.value || null);

    if (!form && options.schema?.value) {
        watch(
            () => options.schema?.value,
            (value) => {
                schema.value = value;
            }
        );
    }

    /**
     * Determine if form event should trigger validation
     *
     * @param schema
     * @param eventName
     */
    function shouldValidate(schema: any, eventName: string) {
        if (!options.validate?.value) {
            return;
        }

        const events = schema.validateOn
            ? [].concat(schema.validateOn)
            : inkline?.options?.validateOn;

        return events!.includes(eventName);
    }

    /**
     * Set the form field value and set its state as dirty
     * Function is called at root form level
     *
     * @param name
     * @param value
     */
    async function setValue(name: string, value: any) {
        if (!options.validate?.value) {
            return;
        }

        let resolvedSchema = clone(schema.value);

        const targetSchema = getValueByPath(resolvedSchema, name);
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

        if (shouldValidate(targetSchema, 'input')) {
            resolvedSchema = await validateSchema(resolvedSchema);
        }

        schema.value = resolvedSchema;
        options.onUpdate?.(resolvedSchema);
    }

    /**
     * Set the form field state as touched.
     * Function is called at root form level
     *
     * @param name
     * @param event
     */
    async function setTouched(name: string, event: Event) {
        if (!options.validate?.value) {
            return;
        }

        let resolvedSchema = clone(schema.value);

        const targetSchema = getValueByPath(resolvedSchema, name);
        if (!targetSchema) {
            throw new Error(
                'Schema to be validated not found. Did you forget to match the schema key to the input "name" prop?'
            );
        }

        resolvedSchema = setValuesAlongPath(resolvedSchema, name, {
            untouched: false,
            touched: true
        });

        if (shouldValidate(targetSchema, event.type)) {
            resolvedSchema = await validateSchema(resolvedSchema);
        }

        schema.value = resolvedSchema;
        options.onUpdate?.(resolvedSchema);
    }

    /**
     * Call form onSubmit callback if validation is successful.
     * Function is called at root form level
     *
     * @param event
     */
    async function onSubmit(event: SubmitEvent) {
        if (!options.validate?.value) {
            return;
        }

        let resolvedSchema = await validateSchema(schema.value);

        resolvedSchema = setSchemaStateRecursively(resolvedSchema, {
            untouched: false,
            touched: true
        });

        if (resolvedSchema.valid) {
            options.onSubmit?.(event);
        }

        schema.value = resolvedSchema;
        options.onUpdate?.(resolvedSchema);
    }

    /**
     * Recursively preform onInput callback for form group or form that the element
     * belongs to, up until the root form is reached.
     *
     * @param nameRef
     * @param value
     */
    async function onInput(nameRef: Ref<string | undefined>, value: any) {
        const name = unref(nameRef);

        if (!options.validate?.value || !name) {
            return;
        }

        if (formGroup) {
            formGroup.onInput(name, value);
        } else if (form) {
            form.onInput(name, value);
        } else if (options.schema?.value) {
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
    function onBlur(nameRef: Ref<string | undefined>, event: any) {
        const name = unref(nameRef);

        if (!options.validate?.value || !name) {
            return;
        }

        if (formGroup) {
            formGroup.onBlur(name, event);
        } else if (form) {
            form.onBlur(name, event);
        } else if (options.schema?.value) {
            setTouched(name, event);
        }
    }

    return { schema, onSubmit, onInput, onBlur };
}

export function useFormValidationError(options: {
    schema: Ref;
    error: Ref<boolean | string[] | undefined>;
}) {
    const hasError = computed(() => {
        if (typeof options.error.value === 'boolean') {
            return options.error.value;
        } else if (options.schema.value && options.error.value) {
            let visible = true;

            ([] as string[]).concat(options.error.value as string[]).forEach((status) => {
                visible = visible && options.schema.value[status];
            });

            return visible;
        }

        return false;
    });

    return { hasError };
}
