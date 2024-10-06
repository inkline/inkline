import type { FormValidatorFn, FormValue } from '../types';

export const maxLength: FormValidatorFn<{ value?: number }> = (value: FormValue, options) => {
    if (typeof options.value === 'undefined') {
        console.error('The "value" option must be specified for "maxLength" validator.');
        return true;
    }

    if (typeof value === 'undefined' || value === null) {
        return false;
    }

    if (value.constructor === Array) {
        return value.length <= options.value;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length <= options.value;
    }

    return String(value).length <= options.value;
};
