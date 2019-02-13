import isAlpha from 'validator/lib/isAlpha';

export function alpha(value, options = {}) {
    const process = (v) => {
        v = String(v);

        if (options.allowDashes) { v = v.replace(/-/g, ''); }
        if (options.allowSpaces) { v = v.replace(/ /g, ''); }

        return v;
    };

    if (value.constructor === Array) {
        return value.every((v) => isAlpha(process(v), options.locale));
    }

    return isAlpha(process(value), options.locale);
}