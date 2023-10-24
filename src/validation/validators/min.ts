import { FormValue } from '@inkline/inkline/types';

export function min(value: FormValue, options: any = { value: 0 }): boolean {
    if (value === undefined || value === null) {
        return false;
    }

    const process = (v: FormValue) => Number(v);

    if (Array.isArray(value)) {
        return value.every((v) => process(v) >= options.value);
    }

    return process(value) >= options.value;
}
