import {
    alpha,
    alphanumeric,
    custom,
    number,
    email,
    max,
    maxLength,
    min,
    minLength,
    required,
    sameAs
} from '@inkline/inkline/validation/validators';
import { FormValidatorFn, FormValue } from '@inkline/inkline';

export const validators: {
    [key: string]: (value: FormValue, options: any) => boolean;
} = {
    alpha,
    alphanumeric,
    custom,
    number,
    email,
    max,
    maxLength,
    min,
    minLength,
    required,
    sameAs
};

export function registerValidator(name: string, validator: FormValidatorFn): void {
    validators[name] = validator;
}

export function unregisterValidator(name: string): void {
    delete validators[name];
}
