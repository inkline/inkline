export function required(value, options = { invalidateFalse: false }) {
    if (value === undefined || value === null) {
        return false;
    }

    if (value.constructor === Array) {
        return !!value.length;
    }

    // For checkboxes, false value means unchecked
    if (typeof value === typeof true) {
        return options.invalidateFalse ? value : true;
    }

    return !!String(value).trim().length;
}