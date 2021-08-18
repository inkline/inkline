export function number(value, options = { allowNegative: false, allowDecimal: false }) {
    let regExpString = '\\d+';
    if (options.allowNegative) {
        regExpString = '[-]?' + regExpString;
    }
    if (options.allowDecimal) {
        regExpString += '([\\.\\,]\\d+)?';
    }
    const regExp = new RegExp(`^${regExpString}$`);
    if (value.constructor === Array) {
        return value.every((v) => regExp.test(v));
    }
    return regExp.test(value);
}
//# sourceMappingURL=number.js.map