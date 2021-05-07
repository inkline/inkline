export function toKebabCase(string) {
    return string
        .replace(/([A-Z])/g, (match, p) => '-' + p.toLowerCase())
        .replace(/_/g, '-');
}
//# sourceMappingURL=toKebabCase.js.map