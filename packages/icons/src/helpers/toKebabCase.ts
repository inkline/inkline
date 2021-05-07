export function toKebabCase (string: string): string {
    return string
        .replace(/([A-Z])/g, (match, p) => '-' + p.toLowerCase())
        .replace(/_/g, '-');
}
