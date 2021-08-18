export function trim (string: string): string {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}
