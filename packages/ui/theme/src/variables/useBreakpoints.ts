import {
    defaultDefinitionOptions,
    DefinitionOptions,
    variable
} from '@inkline/core';

export const breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type Breakpoint = typeof breakpointKeys[number];

/**
 * Breakpoints
 *
 * xs - Extra small devices (portrait phones, less than 576px) - [0, 576)
 * sm - Small devices (landscape phones, 576px and up) - [576, 992)
 * md - Medium devices (tablets, 992px and up) - [992, 1200)
 * lg - Large devices (desktops, 1200px and up) - [1200, 1440)
 * xl - Extra large devices (large desktops, 1200px and up) - [1440, Infinity)
 */
export function useBreakpoints(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const breakpointXs = variable('breakpoint-xs', 0, options);
    const breakpointSm = variable('breakpoint-sm', 576, options);
    const breakpointMd = variable('breakpoint-md', 992, options);
    const breakpointLg = variable('breakpoint-lg', 1200, options);
    const breakpointXl = variable('breakpoint-xl', 1440, options);

    return {
        breakpointXs,
        breakpointSm,
        breakpointMd,
        breakpointLg,
        breakpointXl
    };
}


