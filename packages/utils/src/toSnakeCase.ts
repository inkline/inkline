export function toSnakeCase(string: string): string {
    return string.replace(
        /(-([a-zA-Z])|[A-Z])/g,
        (_, p0: string, p1: string) => '_' + (p1 || p0).toLowerCase()
    );
}
