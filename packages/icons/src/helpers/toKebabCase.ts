export function toKebabCase (string: string): string {
    const regExp = /([A-Z])/g;

    return string.replace(regExp, (match, p) => '-' + p.toLowerCase());
}
