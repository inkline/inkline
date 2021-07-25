export function memoize(fn) {
    const cache = {};

    return (...args) => {
        const cacheKey = JSON.stringify(args);

        if (cacheKey in cache) {
            return cache[cacheKey];
        }

        cache[cacheKey] = fn(...args);
        return cache[cacheKey];
    };
}
