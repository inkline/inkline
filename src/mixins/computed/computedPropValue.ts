import { inklineGlobals } from '@inkline/inkline/plugin';

export function computedPropValue<T> (componentName: string, propertyName: string, propertyValue: T = '' as any) {
    if (inklineGlobals.prototype) {
        if (inklineGlobals.prototype.options.componentOptions[componentName]?.[propertyName]) {
            return inklineGlobals.prototype.options.componentOptions[componentName]?.[propertyName];
        } else if (inklineGlobals.prototype.options[propertyName]) {
            return inklineGlobals.prototype.options[propertyName];
        }
    }

    return propertyValue;
}
