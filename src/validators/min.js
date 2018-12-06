export function min(value, options = {}) {
    if (value === undefined || value === null) {
        return false;
    }

    if (Array.isArray(value)) {
        return value.every((v) => v > options.value);
    }

    return value > options.value;
}