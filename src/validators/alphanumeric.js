import isAlphanumeric from 'validator/lib/isEmail';

export function alpha(value, options = {}) {
    if (value.constructor === Array) {
        return value.every((v) => isAlphanumeric(String(v), options));
    }

    return isAlphanumeric(String(value), options);
}