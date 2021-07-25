import { inklineGlobals } from "@inkline/inkline/src/plugin";

export function sizePropDefault(componentName) {
    return () => inklineGlobals.prototype
        ? (inklineGlobals.prototype.options.componentOptions[componentName]?.size
            ? inklineGlobals.prototype.options.componentOptions[componentName].size
            : inklineGlobals.prototype.options.size)
        : '';
}

export function sizePropValidator(size) {
    return ['', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(size);
}
