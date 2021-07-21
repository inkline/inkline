export const defaultValidationValues = {
    pristine: true,
    dirty: false,
    untouched: true,
    touched: false,
    valid: true,
    invalid: false,
    errors: []
};

export const defaultFieldValidationValues = {
    value: '',
    validators: [],
};

export const reservedValidationFields = [
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
