export function decimal(value, options = { floatingPoint: true }) {
    let regExp;

    if (options.floatingPoint) {
        const regExp = /^[-]?\d*(\.\d+)?$/;
    }

    if (value.constructor === Array) {
        return value.every((v) => regExp.test(v));
    }

    return regExp.test(value);
}