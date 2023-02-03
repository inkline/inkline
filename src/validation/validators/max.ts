export function max(value: any, options: any = { value: 0 }): boolean {
    if (value === undefined || value === null) {
        return false;
    }

    const process = (v: any) => Number(v);

    if (Array.isArray(value)) {
        return value.every((v) => process(v) <= options.value);
    }

    return process(value) <= options.value;
}
