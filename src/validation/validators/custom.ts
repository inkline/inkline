import type { FormValue } from '@inkline/inkline/types';

export async function custom(
    value: FormValue,
    options: any = { validator: () => true }
): Promise<boolean> {
    if (value?.constructor === Array) {
        let valid = true;
        for (const v of value) {
            valid = valid && (await options.validator(v, options));
        }
        return valid;
    }

    return options.validator(value, options);
}
