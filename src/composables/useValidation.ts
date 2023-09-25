import { clone, getValueByPath, setValueByPath, setValuesAlongPath } from '@grozav/utils';
import { computed, inject, Ref, ref, unref, watch } from 'vue';
import { FormKey } from '@inkline/inkline/components/IForm';
import { FormGroupKey } from '@inkline/inkline/components/IFormGroup';
import { validate, update } from '@inkline/inkline/validation';
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
    function setValue(name: string, value: any) {
        if (!options.validate?.value) {
            return;
        }

        let clonedSchema = clone(schema.value);

        const targetSchema = getValueByPath(clonedSchema, name);
        if (!targetSchema) {
            throw new Error(
                'Schema to be validated not found. Did you forget to match the schema key to the input "name" prop?'
            );
        }

        clonedSchema = setValueByPath(clonedSchema, `${name}.value`, value);
        clonedSchema = setValuesAlongPath(clonedSchema, name, {
            pristine: false,
            dirty: true
        });

        if (shouldValidate(targetSchema, 'input')) {
            clonedSchema = validate(clonedSchema);
        }

        schema.value = clonedSchema;
        options.onUpdate?.(clonedSchema);
    }

    /**
     * Set the form field state as touched.
     * Function is called at root form level
     *
     * @param name
     * @param event
     */
    function setTouched(name: string, event: Event) {
        if (!options.validate?.value) {
            return;
        }

        let clonedSchema = clone(schema.value);

        const targetSchema = getValueByPath(clonedSchema, name);
        if (!targetSchema) {
            throw new Error(
                'Schema to be validated not found. Did you forget to match the schema key to the input "name" prop?'
            );
        }

        clonedSchema = setValuesAlongPath(clonedSchema, name, {
            untouched: false,
            touched: true
        });

        if (shouldValidate(targetSchema, event.type)) {
            clonedSchema = validate(clonedSchema);
        }

        schema.value = clonedSchema;
        options.onUpdate?.(clonedSchema);
    }

    /**
     * Call form onSubmit callback if validation is successful.
     * Function is called at root form level
     *
     * @param event
     */
    function onSubmit(event: SubmitEvent) {
        if (!options.validate?.value) {
            return;
        }

        let clonedSchema = clone(schema.value);
        clonedSchema = update(validate(clonedSchema), {
            untouched: false,
            touched: true
        });

        if (clonedSchema.valid) {
            options.onSubmit?.(event);
        }

        schema.value = clonedSchema;
        options.onUpdate?.(clonedSchema);
    }

    /**
     * Recursively preform onInput callback for form group or form that the element
     * belongs to, up until the root form is reached.
     *
     * @param nameRef
     * @param value
     */
    function onInput(nameRef: Ref<string>, value: any) {
        const name = unref(nameRef);

        if (!options.validate?.value) {
            return;
        }

        if (formGroup) {
            formGroup.onInput(name, value);
        } else if (form) {
            form.onInput(name, value);
        } else if (options.schema?.value) {
            setValue(name, value);
        }
    }

    /**
     * Recursively preform onBlur callback for form group or form that the element
     * belongs to, up until the root form is reached.
     *
     * @param nameRef
     * @param event
     */
    function onBlur(nameRef: Ref<string>, event: any) {
        const name = unref(nameRef);

        if (!options.validate?.value) {
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

export function useFormValidationError(options: { schema: Ref; error: Ref<boolean | string[]> }) {
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
