export function custom(value, options = { validator: () => true }) {
    if (value.constructor === Array) {
        return value.every((v) => options.validator(v));
    }

    return options.validator(value);
}