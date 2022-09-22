import { inklineGlobals } from '@inkline/inkline/plugin';

export function computedColorValue (componentName: string, currentColor?: string): string | undefined {
    let colorClass = currentColor;

    if (!colorClass) {
        if (inklineGlobals.prototype) {
            if (inklineGlobals.prototype.options.componentOptions[componentName]?.color) {
                colorClass = inklineGlobals.prototype.options.componentOptions[componentName]?.color;
            } else if (inklineGlobals.prototype.options.color) {
                colorClass = inklineGlobals.prototype.options.color;
            } else if (inklineGlobals.prototype.options.colorMode === 'system') {
                colorClass = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
            } else {
                colorClass = inklineGlobals.prototype.options.colorMode;
            }
        } else {
            colorClass = 'light';
        }
    }

    return colorClass;
}
