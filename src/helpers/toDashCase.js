export function toDashCase (string, from = 'camel') {
    const regExp = from === 'camel' ? /([A-Z])/g : /_([a-zA-Z])/g;

    return string.replace(regExp, (match, p) => '-' + p.toLowerCase());
}
