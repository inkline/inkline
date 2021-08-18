export function toDashCase (string: string, from = 'camel'): string {
    const regExp = from === 'camel' ? /([A-Z])/g : /_([a-zA-Z])/g;

    return string.replace(regExp, (match, p) => '-' + p.toLowerCase());
}
