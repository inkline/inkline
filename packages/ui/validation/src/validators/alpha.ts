import { alpha as validators } from './constants';
import type { FormValidatorFn, FormValue } from '@inkline/types';

export const alpha: FormValidatorFn<{
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
