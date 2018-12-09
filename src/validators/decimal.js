export function decimal(value, options = {}) {
    const regExp = /^[-]?\d*(\.\d+)?$/;

    if (value.constructor === Array) {
        return value.every((v) => regExp.test(v));
    }

    return regExp.test(value);
}