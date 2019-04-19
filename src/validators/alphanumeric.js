import isAlphanumeric from 'validator/lib/isAlphanumeric';

export function alphanumeric(value, options = {}) {
    const process = (v) => {
        v = String(v);

        if (options.allowDashes) { v = v.replace(/-/g, ''); }
        if (options.allowSpaces) { v = v.replace(/ /g, ''); }

        return v;
    };

    if (value.constructor === Array) {
        return value.every((v) => isAlphanumeric(process(v), options.locale));
    }

    return isAlphanumeric(process(value), options.locale);
}