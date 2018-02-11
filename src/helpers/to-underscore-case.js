export function helper (string, from = 'camel') {
    const regExp = from === 'camel' ? /([A-Z])/g : /-([a-zA-Z])/g;

    return string.replace(regExp, (match) => '_' + match.toLowerCase());
}
