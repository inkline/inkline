import { variable } from '@inkline/core';
import { defaultDefinitionOptions } from '@inkline/core';

export function useBreakpoints(options = defaultDefinitionOptions) {
    const breakpointXs = variable('breakpoint-xs', 0, options);
    const breakpointSm = variable('breakpoint-sm', 576, options);
    const breakpointMd = variable('breakpoint-md', 768, options);
    const breakpointLg = variable('breakpoint-lg', 992, options);
    const breakpointXl = variable('breakpoint-xl', 1200, options);
    const breakpointXxl = variable('breakpoint-xxl', 1400, options);

    return {
        breakpointXs,
        breakpointSm,
        breakpointMd,
        breakpointLg,
        breakpointXl,
        breakpointXxl
    };
}
