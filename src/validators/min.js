export function min(value, options = { value: 0 }) {
    if (value === undefined || value === null) {
        return false;
    }

    const process = (v) => Number(v);

    if (Array.isArray(value)) {
        return value.every((v) => process(v) >= options.value);
    }

    return process(value) >= options.value;
}