import { FormValue } from '@inkline/inkline/types';

export function number(
    value: FormValue,
    options: any = { allowNegative: false, allowDecimal: false }
): boolean {
    let regExpString = '\\d+';

    if (options.allowNegative) {
        regExpString = '[-]?' + regExpString;
    }

    if (options.allowDecimal) {
        regExpString += '([\\.\\,]\\d+)?';
    }

    const regExp = new RegExp(`^${regExpString}$`);

    if (value?.constructor === Array) {
        return value.every((v: any) => regExp.test(v));
    }

    return regExp.test(String(value));
}
