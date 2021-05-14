export const defaultValidationValues = {
    pristine: true,
    dirty: false,
    untouched: true,
    touched: false,
    valid: true,
    invalid: false,
    errors: []
};

export const reservedValidationFields = [
    'value',
    'validators',
    'valid',
    'invalid',
    'touched',
    'untouched',
    'dirty',
    'pristine',
    'errors'
];
