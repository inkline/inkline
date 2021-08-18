import { inklineGlobals } from '../../plugin';
export function defaultPropValue(componentName, propertyName, propertyValue = '') {
    return () => inklineGlobals.prototype
        ? (inklineGlobals.prototype.options.componentOptions[componentName]?.[propertyName]
            ? inklineGlobals.prototype.options.componentOptions[componentName][propertyName]
            : inklineGlobals.prototype.options[propertyName])
        : propertyValue;
}
//# sourceMappingURL=default.js.map