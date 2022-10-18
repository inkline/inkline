import { clone, getValueByPath, setValueByPath, setValuesAlongPath } from '@grozav/utils';
import { inject, InjectionKey, provide, ref } from 'vue';
import { FormKey } from '../components/IForm';
import { FormGroupKey } from '../components/IForm/components/IFormGroup/mixin';
import { validate } from '../validation';
import { useInkline } from './inkline';

const ValidationInjectionKey = Symbol('FormValidation') as InjectionKey<{ schema?: any }>;

export function useValidation(props: {
    name?: string;
    schema?: any;
    updateCallBack?: (model: any) => void;
    submitCallBack?: (model: any) => void;
    elementType: 'form' | 'formGroup' | 'checkbox' | 'checkboxGroup';
}) {
    const inkline = useInkline();
    const formSate = inject(ValidationInjectionKey, {});
    const formGroup = inject(FormGroupKey, {});
    const form = inject(FormKey, {});
    const schema = ref<any | null>(null);

    if (props.schema) {
        schema.value = props.schema;
    } else if (formSate?.schema) {
        if (props.name) {
            schema.value = getValueByPath(formSate.schema.value, props.name);
        }
        schema.value = props.schema;
    }

    if (props.elementType === 'form') {
        provide(FormKey, {
            onBlur,
            onInput
        });
    }

    if (props.elementType === 'formGroup') {
        provide(FormGroupKey, {
            onInput,
            onBlur
        });
    }

    function shouldValidate(path: string, eventName: string) {
        const targetSchema = getValueByPath(schema.value, path);
        const events = targetSchema.validateOn
            ? [].concat(targetSchema.validateOn)
            : inkline.options.validateOn;

        return events!.includes(eventName);
    }

    function setValue(name: string, value: any) {
        if (props.schema) {
            let clonedSchema = clone(schema.value);
            clonedSchema = setValueByPath(clonedSchema, `${name}.value`, value);
            clonedSchema = setValuesAlongPath(clonedSchema, name, { pristine: false, dirty: true });
            if (shouldValidate(name, 'input')) {
                clonedSchema = validate(schema);
            }
            schema.value = clonedSchema;
            if (props.updateCallBack) {
                props.updateCallBack(schema.value);
            }
        }
    }

    function touchValue(name: string, event: any) {
        if (props.schema) {
            let clonedSchema = clone(schema.value);
            clonedSchema = setValuesAlongPath(clonedSchema, name, { pristine: false, dirty: true });
            if (shouldValidate(name, event.name)) {
                clonedSchema = validate(schema);
            }
            schema.value = clonedSchema;
            if (props.updateCallBack) {
                props.updateCallBack(schema.value);
            }
        }
    }
    function onSubmit(event: SubmitEvent) {
        if (props.schema) {
            let clonedSchema = clone(schema.value);
            clonedSchema = setValuesAlongPath(validate(schema), '', {
                untouched: false,
                touched: true
            });
            if (props.submitCallBack) {
                props.submitCallBack(event);
            }
            if (clonedSchema.invalid) {
                return;
            }
            schema.value = clonedSchema;
        }
    }

    function onInput(name: string, value: any) {
        if (formGroup.onInput) {
            formGroup.onInput(name, value);
        } else if (form.onInput) {
            form.onInput(name, value);
        } else {
            setValue(name, value);
        }
    }

    function onBlur(name: string, event: any) {
        if (formGroup.onBlur) {
            formGroup.onBlur(name, event);
        } else if (form.onBlur) {
            form.onBlur(name, event);
        } else {
            touchValue(name, event);
        }
    }

    return { schema, onSubmit, onInput, onBlur };
}
