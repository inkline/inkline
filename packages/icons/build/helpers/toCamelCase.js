export function toCamelCase(string) {
    const regExp = /[-_]([a-z0-9])/g;
    return string.replace(regExp, (match, p) => p.toUpperCase());
}
//# sourceMappingURL=toCamelCase.js.map