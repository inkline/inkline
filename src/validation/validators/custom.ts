import type { FormValue } from '@inkline/inkline/types';

export function custom(value: FormValue, options: any = { validator: () => true }): boolean {
    if (value?.constructor === Array) {
        return value.every((v) => options.validator(v));
    }

    return options.validator(value);
}
