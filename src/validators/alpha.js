import isAlpha from 'validator/lib/isAlpha';

export function alpha(value, options = {}) {
    const process = (v) => {
        v = String(v);

        if (options.allowDash) { v = v.replace(/-/g, ''); }
        if (options.allowSpace) { v = v.replace(/ /g, ''); }

        return v;
    };

    if (value.constructor === Array) {
        return value.every((v) => isAlpha(process(v), options.locale));
    }

    return isAlpha(process(value), options.locale);
}