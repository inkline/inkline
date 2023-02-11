import { alphanumeric as validators } from '@inkline/inkline/validation/validators/constants';

export function alphanumeric(rawValue: any, options: any = {}): boolean {
    const locale = options.locale || 'en-US';
    const process = (v: any) => {
        let value = String(v);

        if (options.allowDashes) {
            value = value.replace(/-/g, '');
        }
        if (options.allowSpaces) {
            value = value.replace(/ /g, '');
        }

        return value;
    };

    if (rawValue.constructor === Array) {
        return rawValue.every((v) => validators[locale].test(process(v)));
    }

    return validators[locale].test(process(rawValue));
}
