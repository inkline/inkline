export function clone<T>(source: T): T {
    if (Array.isArray(source)) {
        const target = source.slice().map(clone) as T;
        const targetKeys = Object.keys(target as any[]);

        Object.keys(source)
            .filter((key) => !targetKeys.includes(key))
            .forEach((key) => {
                target[key as keyof T] = source[key as keyof T];
            });

        return target;
    } else if (typeof source === 'object' && source !== null) {
        return Object.keys(source).reduce<T>((acc, key) => {
            acc[key as keyof T] = clone(source[key as keyof T]);

            return acc;
        }, {} as T);
    }

    return source;
}
