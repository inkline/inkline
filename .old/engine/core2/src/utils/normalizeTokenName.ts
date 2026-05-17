export function normalizeTokenName(name: string): string {
    return name.replace(/([0-9])\.([0-9])/g, '$1_$2').replace(/\./g, '--');
}
