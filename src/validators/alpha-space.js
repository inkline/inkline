import isAlpha from 'validator/lib/isEmail';

export function alphaSpace(value, options = {}) {
    if (value.constructor === Array) {
        return value.every((v) => isAlpha(String(v).replace(/ /g, ''), options));
    }

    return isAlpha(String(value).replace(/ /g, ''), options);
}