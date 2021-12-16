export function colorVariantClass (component: any): { [key: string]: boolean } {
    let colorClass = component.color;

    if (!colorClass) {
        if (component.$inkline.options.colorMode === 'system') {
            colorClass = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
        } else {
            colorClass = component.$inkline.options.colorMode;
        }
    }

    return {
        [`-${colorClass}`]: true
    };
}
