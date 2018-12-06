import isAlpha from 'validator/lib/isEmail';

export function alphaDash(value, options = {}) {
    if (value.constructor === Array) {
        return value.every((v) => isAlpha(String(v).replace(/-/g, ''), options));
    }

    return isAlpha(String(value).replace(/-/g, ''), options);
}