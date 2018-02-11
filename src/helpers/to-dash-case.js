export function helper (string, from = 'camel') {
    const regExp = from === 'camel' ? /([A-Z])/g : /_([a-zA-Z])/g;

    return string.replace(regExp, (match) => '-' + match.toLowerCase());
}
