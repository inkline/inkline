import type { FormValue, FormValidatorFn } from '../types';

export const minLength: FormValidatorFn<{ value?: number }> = (value: FormValue, options) => {
    if (typeof options.value === 'undefined') {
        console.error('The "value" option must be specified for "minLength" validator.');
        return true;
    }

    if (typeof value === 'undefined' || value === null) {
        return false;
    }

    if (value.constructor === Array) {
        return value.length >= options.value;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length >= options.value;
    }

    return String(value).length >= options.value;
};
