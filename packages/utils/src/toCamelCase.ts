export function toCamelCase(string: string): string {
    return string.replace(/[-_]([a-z0-9])/g, (_, p: string) => p.toUpperCase());
}
