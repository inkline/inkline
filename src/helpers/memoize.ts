// eslint-disable-next-line @typescript-eslint/ban-types
export function memoize<T> (fn: T): () => T {
    const cache: { [key: string]: T } = {};

    return (...args): T => {
        const cacheKey = JSON.stringify(args);

        if (cacheKey in cache) {
            return cache[cacheKey];
        }

        cache[cacheKey] = (fn as any)(...args);
        return cache[cacheKey];
    };
}
