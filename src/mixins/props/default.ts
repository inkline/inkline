import { inklineGlobals } from '@inkline/inkline/plugin';

export function defaultPropValue<T> (componentName: string, propertyName: string, propertyValue: T = '' as any) {
    return (): T => inklineGlobals.prototype
        ? (inklineGlobals.prototype.options.componentOptions[componentName]?.[propertyName]
            ? inklineGlobals.prototype.options.componentOptions[componentName][propertyName]
            : inklineGlobals.prototype.options[propertyName])
        : propertyValue;
}
