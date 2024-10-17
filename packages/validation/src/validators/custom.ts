import type { FormValidatorFn, FormValue } from '@inkline/types';

export const custom: FormValidatorFn<{
    validator?: FormValidatorFn;
}> = async (value: FormValue, options) => {
    if (!options.validator) {
        console.error('No `validator` function provided for custom validator.');
        return true;
    }

    if (value?.constructor === Array) {
        let valid = true;
        for (const v of value) {
            valid = valid && (await options.validator(v, options));
        }
        return valid;
    }

    return options.validator(value, options);
};
