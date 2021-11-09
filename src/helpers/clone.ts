export function clone (source: any): any {
    if (Array.isArray(source)) {
        const target: any = source.slice().map(clone);
        const targetKeys = Object.keys(target);

        Object.keys(source)
            .filter((key) => !targetKeys.includes(key))
            .forEach((key) => {
                target[key] = source[key as any];
            });

        return target;
    } else if (typeof source === 'object') {
        return Object.keys(source).reduce((acc: any, key) => {
            acc[key] = clone(source[key]);

            return acc;
        }, {});
    }

    return source;
}
