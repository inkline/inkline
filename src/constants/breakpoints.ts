export interface Breakpoints {
    [key: string]: number[]
}

/**
 * Responsive breakpoints and their values.
 */
export const breakpoints: Breakpoints = {
    xs: [0, 575],
    sm: [576, 767],
    md: [768, 991],
    lg: [992, 1199],
    xl: [1200, 1399],
    xxl: [1400, Infinity]
};

/**
 * Available window breakpoints. The emtpy string is required for generating class names without breakpoints.
 */
export const breakpointKeys: string[] = ['', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
