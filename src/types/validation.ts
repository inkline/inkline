/**
 * Form Schema
 */

export type ReservedFormStateKeys =
    | 'valid'
    | 'invalid'
    | 'untouched'
    | 'touched'
    | 'pristine'
    | 'dirty';
export type ReservedFormFieldKeys = 'value' | 'validators';
export type ReservedFormKeys = ReservedFormFieldKeys | ReservedFormStateKeys | 'errors';
export type AllowedFormKeys = Exclude<string, ReservedFormKeys>;

export type FormValue = FormValue[] | object | string | number | boolean | null | undefined;

export interface FormValidator {
    name: string;
    [key: string]: any;
}

export type FormField<V> = {
    value?: V;
    validators?: FormValidator[];
};

export type Form = Record<string, FormValue>;

export type FormSchema<T = Form> = {
    [K in keyof T]: T[K] extends infer U
        ? U extends Array<infer V>
            ? V extends object
                ? FormSchema<U[number]>[]
                : FormField<U[number]>[]
            : U extends object
            ? FormSchema<U>
            : FormField<U>
        : never;
};

/**
 * Resolved Form Schema
 */

export interface FormError {
    name: string;
    message: string;
    path: string;
}

export interface FormState {
    valid: boolean;
    invalid: boolean;
    untouched: boolean;
    touched: boolean;
    pristine: boolean;
    dirty: boolean;
    errors: FormError[];
}

export type ResolvedFormField<V> = FormField<V> & FormState;

export type ResolvedFormSchema<T> = {
    [K in keyof T]: T[K] extends infer U
        ? U extends Array<infer V>
            ? V extends object
                ? ResolvedFormSchema<U[number]>[]
                : ResolvedFormField<U[number]>[]
            : U extends object
            ? ResolvedFormSchema<U>
            : ResolvedFormField<U>
        : never;
} & FormState;
