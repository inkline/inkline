export function clone(source) {
    if (Array.isArray(source)) {
        const target = source.slice().map(clone);
        const targetKeys = Object.keys(target);

        Object.keys(source)
            .filter((key) => !targetKeys.includes(key))
            .forEach((key) => {
                target[key] = source[key];
            });

        return target;
    } else if (typeof source === 'object') {
        return Object.keys(source).reduce((acc, key) => {
            acc[key] = clone(source[key]);

            return acc;
        }, {});
    }

    return source;
}
