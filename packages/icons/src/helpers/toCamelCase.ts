export function toCamelCase (string: string): string {
    const regExp = /[-_]([a-z0-9])/g;

    return string.replace(regExp, (match, p) => p.toUpperCase());
}
