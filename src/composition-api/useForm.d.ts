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
    validators: Array<string | FormFieldValidator>;
}

export interface FormGroup extends FormState {
    [key: string]: FormField | FormField[] | FormGroup | boolean;
}

declare function useForm<T>(schema: T): { form: FormGroup };
