import { alpha as validators } from './helpers';

export function alpha(value, options = {}) {
    const locale = options.locale || 'en-US';
    const process = (v) => {
        v = String(v);

        if (options.allowDashes) { v = v.replace(/-/g, ''); }
        if (options.allowSpaces) { v = v.replace(/ /g, ''); }

        return v;
    };

    if (value.constructor === Array) {
        return value.every((v) => validators[locale].test(process(v)));
    }

    return validators[locale].test(process(value));
}
