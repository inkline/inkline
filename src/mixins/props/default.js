import { inklineGlobals } from "@inkline/inkline/src/plugin";

export function defaultPropValue(componentName, propertyName, propertyValue = '') {
    return () => inklineGlobals.prototype
        ? (inklineGlobals.prototype.options.componentOptions[componentName]?.[propertyName]
            ? inklineGlobals.prototype.options.componentOptions[componentName][propertyName]
            : inklineGlobals.prototype.options[propertyName])
        : propertyValue;
}
