export function toCamelCase (string, from = 'dash') {
    const regExp = from === 'dash' ? /-([a-z])/g : /_([a-z])/g;

    return string.replace(regExp, (match) => match.toUpperCase());
}
