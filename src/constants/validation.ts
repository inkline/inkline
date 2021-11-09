export const defaultValidationValues: { [key: string]: any } = {
    pristine: true,
    dirty: false,
    untouched: true,
    touched: false,
    valid: true,
    invalid: false,
    errors: []
};

export const defaultFieldValidationValues: { [key: string]: any } = {
    value: '',
    validators: []
};

export const reservedValidationFields: string[] = [
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
