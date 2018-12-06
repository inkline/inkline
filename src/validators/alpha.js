import isAlpha from 'validator/lib/isEmail';

export function alpha(value, options = {}) {
    if (value.constructor === Array) {
        return value.every((v) => isAlpha(String(v), options));
    }

    return isAlpha(String(value), options);
}