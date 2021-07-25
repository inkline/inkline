import { inklineGlobals } from "@inkline/inkline/src/plugin";

export function colorPropDefault(componentName) {
    return () => inklineGlobals.prototype
        ? (inklineGlobals.prototype.options.componentOptions[componentName]?.color
            ? inklineGlobals.prototype.options.componentOptions[componentName].color
            : inklineGlobals.prototype.options.color)
        : '';
}
