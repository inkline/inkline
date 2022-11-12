import { clone, getValueByPath, setValueByPath, setValuesAlongPath } from '@grozav/utils';
import { computed, inject, ref } from 'vue';
import { FormKey } from '../components/IForm';
import { FormGroupKey } from '../components/IForm/components/IFormGroup/mixin';
import { validate } from '../validation';
import { useInkline } from './inkline';

export function useValidation(options: {
    name?: string;
    schema?: any;
    onUpdate?: (model: any) => void;
    onSubmit?: (model: any) => void;
}) {
    const inkline = useInkline();

    const form = inject(FormKey, null);
    const formGroup = inject(FormGroupKey, null);

    const schema = form
        ? computed(() => form.schema && getValueByPath(form.schema.value, options.name!))
        : ref<any | null>(options.schema || null);

    /**
     * Determine if form event should trigger validation
     *
     * @param path
     * @param eventName
     */
    function shouldValidate(schema: any, eventName: string) {
        const events = schema.validateOn
            ? [].concat(schema.validateOn)
            : inkline.options.validateOn;

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
        let clonedSchema = clone(schema.value);

        const targetSchema = getValueByPath(clonedSchema, name);
        if (!targetSchema) {
            throw new Error(
                'Schema to be validated not found. Did you forget to match the schema key to the input "name" prop?'
            );
        }

        clonedSchema = setValueByPath(clonedSchema, `${name}.value`, value);
        clonedSchema = setValuesAlongPath(clonedSchema, name, { pristine: false, dirty: true });

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
    function setTouched(name: string, event: Event & { name: string }) {
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

        if (shouldValidate(targetSchema, event.name)) {
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
        let clonedSchema = clone(schema.value);
        clonedSchema = setValuesAlongPath(validate(clonedSchema), '', {
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
     * @param name
     * @param value
     */
    function onInput(name: string, value: any) {
        if (formGroup) {
            formGroup.onInput(name, value);
        } else if (form) {
            form.onInput(name, value);
        } else if (options.schema) {
            setValue(name, value);
        }
    }

    /**
     * Recursively preform onBlur callback for form group or form that the element
     * belongs to, up until the root form is reached.
     *
     * @param name
     * @param event
     */
    function onBlur(name: string, event: any) {
        if (formGroup) {
            formGroup.onBlur(name, event);
        } else if (form) {
            form.onBlur(name, event);
        } else if (options.schema) {
            setTouched(name, event);
        }
    }

    return { schema, onSubmit, onInput, onBlur };
}

export function useFormValidationError(options: { schema: any; error: boolean | string[] }) {
    const hasError = computed(() => {
        if (typeof options.error === 'boolean') {
            return options.error;
        } else if (options.schema.value && options.error) {
            let visible = true;

            ([] as string[]).concat(options.error as string[]).forEach((status) => {
                visible = visible && options.schema.value[status];
            });

            return visible;
        }

        return false;
    });

    return { hasError };
}
