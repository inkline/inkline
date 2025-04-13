export function normalizeCSSSelector(selector: string): string {
    return selector.replace(/[:%]/g, '\\$&');
}
