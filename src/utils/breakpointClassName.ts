export function breakpointClassName(property: string, value: string | number | boolean): string {
    return `-${property
        .replace('xxl', '2xl')
        .replace(/([A-Z])/g, '-$1')
        .replace(/([a-z])([0-9])/g, '$1-$2')
        .toLowerCase()}${typeof value !== 'boolean' && value ? `-${value}` : ''}`;
}
