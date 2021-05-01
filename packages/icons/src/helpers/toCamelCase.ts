export function toCamelCase (string: string) {
    const regExp: RegExp = /-([a-z0-9])/g;

    return string.replace(regExp, (match, p) => p.toUpperCase());
}
