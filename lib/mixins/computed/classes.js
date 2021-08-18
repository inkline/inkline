export function colorVariantClass(component) {
    let colorClass = component.color;
    if (!colorClass) {
        if (component.$inkline.options.colorMode === 'system') {
            colorClass = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        else {
            colorClass = component.$inkline.options.colorMode;
        }
    }
    return {
        [`-${colorClass}`]: true
    };
}
//# sourceMappingURL=classes.js.map