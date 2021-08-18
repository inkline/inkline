export function maxLength(value: any, options: any = { value: 0 }): boolean {
    if (value === undefined || value === null) {
        return false;
    }

    if (value.constructor === Array) {
        return value.length <= options.value;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length <= options.value;
    }

    return String(value).length <= options.value;
}
