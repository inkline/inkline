import { BreakpointObject, BreakpointProp } from './types';
import { breakpointKeys } from '@inkline/theme';

export function isBreakpointObject<T>(
    property: T | BreakpointProp<T>
): property is BreakpointObject<T> {
    return (
        typeof property === 'object' &&
        property !== null &&
        breakpointKeys.some((key) => key in property)
    );
}

export function toBreakpointClasses(
    name: string,
    value: BreakpointProp<string | number | boolean | undefined>,
    override: BreakpointObject<string | number | boolean | undefined> = {}
) {
    const classes: Record<string, boolean> = {};

    const breakpointValues = isBreakpointObject(value)
        ? {
              xs: value.xs ?? override.xs,
              sm: value.sm ?? override.sm,
              md: value.md ?? override.md,
              lg: value.lg ?? override.lg,
              xl: value.xl ?? override.xl
          }
        : override;

    breakpointKeys.forEach((breakpoint) => {
        if (breakpoint in breakpointValues && breakpointValues[breakpoint]) {
            if (
                typeof breakpointValues[breakpoint] === 'string' ||
                typeof breakpointValues[breakpoint] === 'number'
            ) {
                classes[`-${breakpoint}:${name}-${breakpointValues[breakpoint]}`] = true;
            } else if (typeof breakpointValues[breakpoint] === 'boolean') {
                classes[`-${breakpoint}:${name}`] = true;
            }
        }
    });

    if (value) {
        if (typeof value === 'string' || typeof value === 'number') {
            classes[`-${name}-${value}`] = true;
        } else if (typeof value === 'boolean') {
            classes[`-${name}`] = true;
        }
    }

    return classes;
}
