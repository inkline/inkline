import type { FormValue, FormValidatorFn } from '@inkline/types';

export const min: FormValidatorFn<{ value?: number }> = (value: FormValue, options) => {
    if (typeof options.value === 'undefined') {
        console.error('The "value" option must be specified for "min" validator.');
        return true;
    }

    if (typeof value === 'undefined' || value === null) {
        return false;
    }

    const process = (v: FormValue) => Number(v);

    if (Array.isArray(value)) {
        return value.every((v: number) => process(v) >= (options.value as number));
    }

    return process(value) >= options.value;
};
