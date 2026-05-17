import { defaultDefinitionOptions, DefinitionOptions, media, Selector, valueOf, Variable } from '@inkline/core';
import { Breakpoint, breakpointKeys, useBreakpoints } from '../variables';

export type BreakpointDirection = 'only' | 'up' | 'down';

export function useBreakpointSelector(breakpoint: Breakpoint | `${Breakpoint}-${BreakpointDirection}`, value: Selector | Selector[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const parts = breakpoint.split('-');

    const lowerBoundKey = parts[0] as Breakpoint;
    const lowerBoundKeyIndex = breakpointKeys.indexOf(lowerBoundKey);
    const upperBoundKeyIndex = lowerBoundKeyIndex + 1;
    const upperBoundKey = breakpointKeys[upperBoundKeyIndex];

    if (lowerBoundKeyIndex === -1) {
        throw new Error(`Invalid breakpoint key used in "useBreakpointSelector": ${lowerBoundKey}`);
    }

    const { breakpointXs, breakpointSm, breakpointMd, breakpointLg, breakpointXl } = useBreakpoints(options);
    const breakpointsByKey: Record<Breakpoint, Variable> = {
        xs: breakpointXs,
        sm: breakpointSm,
        md: breakpointMd,
        lg: breakpointLg,
        xl: breakpointXl
    };

    const offset = 0.01;

    const lowerBound = valueOf(breakpointsByKey[lowerBoundKey]) as number;
    const upperBound = upperBoundKeyIndex < breakpointKeys.length ? (valueOf(breakpointsByKey[upperBoundKey]) as number - offset) : undefined;

    const direction = parts[1] as BreakpointDirection;
    if (!direction || direction === 'only') {
        return media(`screen and (min-width: ${lowerBound}px)${upperBound ? ` and (max-width: ${upperBound - offset}px` : ''})`, value, options);
    } else if (direction === 'up') {
        return media(`screen and (min-width: ${lowerBound}px)`, value, options);
    } else if (direction === 'down' && upperBoundKey !== 'xl' && upperBound) {
        return media(`screen and (max-width: ${upperBound - offset}px)`, value, options);
    } else {
        throw new Error(`Invalid breakpoint used in "useBreakpointSelector": ${breakpoint}`);
    }
}
