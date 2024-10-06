import type { FormValidatorFn, FormValue } from '../types';

export const number: FormValidatorFn<{ allowNegative?: boolean; allowDecimal?: boolean }> = (
    value: FormValue,
    options
) => {
    let regExpString = '\\d+';

    if (options.allowNegative) {
        regExpString = '[-]?' + regExpString;
    }

    if (options.allowDecimal) {
        regExpString += '([\\.\\,]\\d+)?';
    }

    const regExp = new RegExp(`^${regExpString}$`);

    if (value?.constructor === Array) {
        return value.every((v) => regExp.test(`${v as string | number}`));
    }

    return regExp.test(String(value));
};
