/**
 * Form Schema
 */
import { Renderable } from './renderable';

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

export type ValidateOnEvent = 'blur' | 'change' | 'input' | 'submit';

export type FormValue = FormValue[] | object | string | number | boolean | null | undefined;

export type FormValidatorFn<T = Record<string, any>, S extends Form = Form> = (
    value: FormValue,
    options: T & {
        schema?: ResolvedFormSchema<S> | FormSchema<S>;
        path: string;
    }
) => boolean | Promise<boolean>;

export type FormValidatorMessageFn = (options?: Record<string, any>) => string;
export type FormValidatorMessage = string | FormValidatorMessageFn;

export interface FormValidator {
    name: string;
    message?: FormValidatorMessage;
    [key: string]: any;
}

export type FormField<V> = {
    value?: V;
    validateOn?: ValidateOnEvent;
    validators?: Array<FormValidator | string>;
};

export type Form = Record<string, any>;

export type FormSchema<T extends Form> = {
    [K in keyof T]: T[K] extends infer U
        ? U extends Array<infer V>
            ? U extends FormField<V[]>
                ? FormField<V[]>
                : V extends object
                  ? FormSchema<V>[]
                  : FormField<U[number]>[] | FormField<U>
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

export type ResolvedFormField<V> = {
    value: V;
    validators: Array<FormValidator | string>;
} & FormState;

export type ResolvedFormSchema<T extends Form> = {
    [K in keyof T]: T[K] extends Array<infer V>
        ? V extends object
            ? ResolvedFormSchema<V>[]
            : ResolvedFormField<T[K][number]>[]
        : T[K] extends object
          ? ResolvedFormSchema<T[K]>
          : ResolvedFormField<T[K]>;
} & FormState;

/**
 * Components
 */

export interface FormOption {
    id: string | number;
    label?: Renderable;
    value?: FormValue;
    disabled?: boolean;
    readonly?: boolean;
    [key: string]: any;
}
