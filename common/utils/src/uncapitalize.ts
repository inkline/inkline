export function uncapitalize<T extends string>(value: T): Uncapitalize<T> {
    return value.charAt(0).toLowerCase() + value.slice(1) as Uncapitalize<T>;
}
