export function toCamelCase (string, from = 'dash') {
    const regExp = from === 'dash' ? /-([a-z0-9])/g : /_([a-z0-9])/g;

    return string.replace(regExp, (match, p) => p.toUpperCase());
}
