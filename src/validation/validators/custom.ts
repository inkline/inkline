export function custom(value: any, options: any = { validator: () => true }): boolean {
    if (value.constructor === Array) {
        return value.every((v) => options.validator(v));
    }

    return options.validator(value);
}
