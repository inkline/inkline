import { inklineGlobals } from '@inkline/inkline/plugin';

export function defaultPropValue<T> (componentName: string, propertyName: string, propertyValue: T = '' as any) {
    return (): T => {
        if (inklineGlobals.prototype) {
            if (inklineGlobals.prototype.options.componentOptions[componentName]?.[propertyName]) {
                return inklineGlobals.prototype.options.componentOptions[componentName]?.[propertyName];
            } else if (inklineGlobals.prototype.options[propertyName]) {
                return inklineGlobals.prototype.options[propertyName];
            }
        }

        return propertyValue;
    };
}
