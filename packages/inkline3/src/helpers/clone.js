export function clone(source) {
    if (Array.isArray(source)) {
        return source.slice().map(clone);
    } else if (typeof source === 'object') {
        return Object.keys(source).reduce((acc, key) => {
            acc[key] = clone(source[key]);

            return acc;
        }, {});
    }

    return source;
}
