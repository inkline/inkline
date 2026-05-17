import type { FormField, ReservedFormKeys, FormState } from '@inkline/types';

export const defaultValidationStateValues: FormState = {
    pristine: true,
    dirty: false,
    untouched: true,
    touched: false,
    valid: true,
    invalid: false,
    errors: []
};

export const defaultValidationFieldValues: FormField<string> = {
    value: undefined,
    validators: []
};

export const reservedValidationFields: Array<string | ReservedFormKeys> = [
    'value',
    'validators',
    'pristine',
    'dirty',
    'untouched',
    'touched',
    'valid',
    'invalid',
    'errors'
];
