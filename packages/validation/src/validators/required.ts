import type { FormValidatorFn, FormValue } from '@inkline/types';

export const required: FormValidatorFn<{ invalidateFalse?: boolean }> = (
    value: FormValue,
    options
) => {
    if (value === undefined || value === null) {
        return false;
    }

    if (value.constructor === Array) {
        return !!value.length;
    }

    // For checkboxes, false value means unchecked
    if (typeof value === 'boolean') {
        return options.invalidateFalse ? !!value : true;
    }

    return !!String(value).trim().length;
};
