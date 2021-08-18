export function toCamelCase (string: string, from = 'dash'): string {
    const regExp = from === 'dash' ? /-([a-z0-9])/g : /_([a-z0-9])/g;

    return string.replace(regExp, (match, p) => p.toUpperCase());
}
