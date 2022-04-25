import { Configuration } from './types';
import { marginResolvers } from './resolvers';
import { marginGenerators } from './generators';

export const defaultConfig: Configuration = {
    resolvers: [
        ...marginResolvers()
    ],
    generators: [
        ...marginGenerators()
    ],
    theme: {
        margin: '1rem',
        padding: '1rem',
        border: '1px solid #c4cdd0',
        elements: {},
        components: {}
    }
    // Need variants based on core values
    //
    // variants: {
    //     margin: {
    //         xs: ({ apply, variables }) => apply(variable, { multiply: 0.5 }),
    //
    //         // xs: ({ value, multiply }) => multiply(value, 0.5), // multiply({ top, right, bottom, left }, 0.75) => // { top * 0.75, right * 0.75 .. }
    //         // sm: ({ value, multiply }) => multiply(value, 0.75), // multiply({ top, right, bottom, left }, 0.75) => // { top * 0.75, right * 0.75 .. }
    //         // md: ({ value, multiply }) => multiply(value, 1),
    //         // lg: ({ value, multiply }) => multiply(value, 1.25),
    //         // xl: ({ value, multiply }) => multiply(value, 1.5)
    //
    //         // theme: { margin: { default: { .. }, sm: { .. }, md: { .. } } }
    //         // margin-top--sm: calc(var(--margin-top) * 0.75)
    //         // margin-right--sm: calc(var(--margin-top) * 0.75)
    //         // margin-bottom--sm: calc(var(--margin-top) * 0.75)
    //         // margin-left--sm: calc(var(--margin-top) * 0.75)
    //         // margin--sm: var(--margin-top--sm) var(--margin-right--sm) var(--margin-bottom--sm) var(--margin-left--sm)
    //     },
    //     color: {
    //         red: {
    //             100: { lighten: 80 },
    //
    //             100: ({ value, lighten }) => lighten(value, 80),
    //             200: ({ value, lighten }) => lighten(value, 60),
    //             300: ({ value, lighten }) => lighten(value, 40),
    //             400: ({ value, lighten }) => lighten(value, 20),
    //             500: ({ value }) => value,
    //             600: ({ value, darken }) => darken(value, 20),
    //             700: ({ value, darken }) => darken(value, 40),
    //             800: ({ value, darken }) => darken(value, 60),
    //             900: ({ value, darken }) => darken(value, 80)
    //
    //             // --color-red-h--100: var(--color-red-h);
    //             // --color-red-s--100: var(--color-red-s);
    //             // --color-red-l--100: var(--color-red-l) * 0.2;
    //             // --color-red--100: var(--color-red-h) var(--color-red-s) var(--color-red-l);
    //         }
    //     }
    // }
};

// var(--margin--4)
// var(--margin-top--4)
// var(--margin-top--sm)
