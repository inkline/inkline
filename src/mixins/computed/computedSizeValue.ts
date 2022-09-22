import { inklineGlobals } from '@inkline/inkline/plugin';

export function computedSizeValue (componentName: string, currentSize?: string): string | undefined {
    let sizeClass = currentSize;

    if (inklineGlobals.prototype) {
        if (inklineGlobals.prototype.options.componentOptions[componentName]?.size) {
            sizeClass = inklineGlobals.prototype.options.componentOptions[componentName]?.size;
        } else if (inklineGlobals.prototype.options.size) {
            sizeClass = inklineGlobals.prototype.options.size;
        }
    }

    if (!sizeClass) {
        sizeClass = 'md';
    }

    return sizeClass;
}
