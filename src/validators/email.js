import isEmail from 'validator/lib/isEmail';

export function email(value, options = {}) {
    if (value.constructor === Array) {
        return value.every((v) => isEmail(String(v), options));
    }

    return isEmail(String(value), options);
}