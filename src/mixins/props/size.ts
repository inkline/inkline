export function sizePropValidator (size: string): boolean {
    return ['', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(size);
}
