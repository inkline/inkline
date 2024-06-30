import { alphanumeric as validators } from '@inkline/inkline/validation/validators/constants';
import type { FormValue, FormValidatorFn } from '@inkline/inkline/types';

export const alphanumeric: FormValidatorFn<{
    locale?: string;
    allowDashes?: boolean;
    allowSpaces?: boolean;
}> = (rawValue: FormValue, options) => {
    const locale = options.locale || 'en-US';
    const process = (v: FormValue) => {
        let value = String(v);

        if (options.allowDashes) {
            value = value.replace(/-/g, '');
        }
        if (options.allowSpaces) {
            value = value.replace(/ /g, '');
        }

        return value;
    };

    if (rawValue?.constructor === Array) {
        return rawValue.every((v) => validators[locale].test(process(v)));
    }

    return validators[locale].test(process(rawValue));
};
