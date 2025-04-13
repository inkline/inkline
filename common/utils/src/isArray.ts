export function isArray<T>(value: unknown): value is Array<T> {
    return (value as T[]).constructor === Array;
}
