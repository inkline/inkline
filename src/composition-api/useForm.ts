import { reactive } from 'vue';
import { initialize } from '@inkline/inkline/validation';

export interface FormFieldValidator {
    name: string;
    [key: string]: any;
}

export interface FormState {
    valid: boolean;
    invalid: boolean;
    untouched: boolean;
    touched: boolean;
    pristine: boolean;
    dirty: boolean;
}

export interface FormField extends FormState {
    value: any;
    errors: any;
    validators: Array<string | FormFieldValidator>;
}

export interface FormGroup extends FormState {
    [key: string]: FormField | FormField[] | FormGroup | boolean;
}

export function useForm<T>(rawSchema: T): { form: FormGroup } {
    const schema = initialize(rawSchema);
    const form = reactive(schema);

    return {
        form
    };
}
