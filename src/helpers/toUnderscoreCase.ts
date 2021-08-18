export function toUnderscoreCase (string: string, from = 'camel'): string {
    const regExp = from === 'camel' ? /([A-Z])/g : /-([a-zA-Z])/g;

    return string.replace(regExp, (match, p) => '_' + p.toLowerCase());
}
