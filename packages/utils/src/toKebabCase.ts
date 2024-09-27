export function toKebabCase(string: string): string {
    return string.replace(
        /(_([a-zA-Z])|[A-Z])/g,
        (_, p0: string, p1: string) => '-' + (p1 || p0).toLowerCase()
    );
}
