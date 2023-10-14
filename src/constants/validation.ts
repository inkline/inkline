import { FormField, ReservedFormKeys, ResolvedFormSchemaState } from '@inkline/inkline/types';

export const defaultValidationStateValues: ResolvedFormSchemaState = {
    pristine: true,
    dirty: false,
    untouched: true,
    touched: false,
    valid: true,
    invalid: false,
    errors: []
};

export const defaultValidationFieldValues: FormField<string> = {
    value: '',
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
