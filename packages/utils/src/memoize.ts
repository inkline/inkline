type MemoizeableFunction<P, R> = (...props: P[]) => R;

export function memoize<P, R>(
    fn: MemoizeableFunction<P, R>,
    serializeFn: (...args: P[]) => string = (...args: P[]) => JSON.stringify(args)
): MemoizeableFunction<P, R> {
    const cache: { [index: string]: R } = {};

    return (...args: P[]) => {
        const index = serializeFn(...args);

        if (cache[index] === undefined) {
            cache[index] = fn(...args);
        }

        return cache[index];
    };
}
