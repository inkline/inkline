import { $inkline } from '@inkline/inkline/plugin';

export function defaultPropValue<T> (componentName: string, propertyName: string, propertyValue: T = '' as any) {
    return (): T => $inkline.prototype
        ? ($inkline.prototype.value.options.componentOptions[componentName]?.[propertyName]
            ? $inkline.prototype.value.options.componentOptions[componentName][propertyName]
            : $inkline.prototype.value.options[propertyName])
        : propertyValue;
}
