export function number(value, options = { allowNegative: false, allowDecimal: false }) {
    let regExp = "\\d+";

    if (options.allowNegative) {
        regExp = "[-]?" + regExp;
    }

    if (options.allowDecimal) {
        regExp += "([\\.\\,]\\d+)?";
    }

    regExp = new RegExp(`^${regExp}$`);

    if (value.constructor === Array) {
        return value.every((v) => regExp.test(v));
    }

    return regExp.test(value);
}
