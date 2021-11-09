export function number (value: any, options: any = { allowNegative: false, allowDecimal: false }): boolean {
    let regExpString = '\\d+';

    if (options.allowNegative) {
        regExpString = '[-]?' + regExpString;
    }

    if (options.allowDecimal) {
        regExpString += '([\\.\\,]\\d+)?';
    }

    const regExp = new RegExp(`^${regExpString}$`);

    if (value.constructor === Array) {
        return value.every((v: any) => regExp.test(v));
    }

    return regExp.test(value);
}
