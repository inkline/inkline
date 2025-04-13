type GenericFunction = ((...args: unknown[]) => unknown);

export function isFunction<T = GenericFunction>(fn: unknown): fn is T {
    return fn instanceof Function;
}
