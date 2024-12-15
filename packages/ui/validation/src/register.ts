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
} from './validators';
import type { FormValidatorFn } from '@inkline/types';

export const validators: {
    [key: string]: FormValidatorFn;
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
