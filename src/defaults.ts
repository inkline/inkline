import { Configuration } from './types';
import {
    colorResolvers,
    marginResolvers,
    paddingResolvers
} from './resolvers';
import {
    colorGenerators,
    marginGenerators,
    paddingGenerators
} from './generators';

export const defaultConfig: Configuration = {
    resolvers: [
        ...colorResolvers(),
        ...marginResolvers(),
        ...paddingResolvers()
    ],
    generators: [
        ...colorGenerators(),
        ...marginGenerators(),
        ...paddingGenerators()
    ],
    theme: {
        color: {
            red: '#f2413d',
            orange: '#f98e5a',
            yellow: '#ffda76',
            green: '#2fb079',
            teal: '#48b4a9',
            blue: '#178bb2',
            purple: '#8268ae',
            pink: '#fc778a',
            white: '#ffffff',
            black: '#000000',
            primary: '#178bb2',
            secondary: '#8268ae',
            info: '<% theme.color.teal %>',
            success: '<% theme.color.green %>'
        },
        margin: '1rem',
        padding: '1rem',
        border: '1px solid #c4cdd0',
        elements: {},
        components: {},
        variants: {
            margin: {
                sm: { top: '5px' },
                md: { multiply: 1.5 },
                lg: { add: 1.5 },
                xl: {
                    top: '<% theme.margin %>',
                    divide: 2
                }
            },
            color: {
                red: {
                    100: { h: 10, s: 10, l: 10, a: 0.5 },
                    200: { lighten: 0.5 },
                    300: { lightness: 80 },
                    400: { lightness: 80 },
                    500: {},
                    600: '#ff0000'
                }
            }
        }
    }
    // variants: {
    //
    // //     margin: {
    // //         xs: ({ apply, variables }) => apply(variable, { multiply: 0.5 }),
    // //
    // //         // xs: ({ value, multiply }) => multiply(value, 0.5), // multiply({ top, right, bottom, left }, 0.75) => // { top * 0.75, right * 0.75 .. }
    // //         // sm: ({ value, multiply }) => multiply(value, 0.75), // multiply({ top, right, bottom, left }, 0.75) => // { top * 0.75, right * 0.75 .. }
    // //         // md: ({ value, multiply }) => multiply(value, 1),
    // //         // lg: ({ value, multiply }) => multiply(value, 1.25),
    // //         // xl: ({ value, multiply }) => multiply(value, 1.5)
    // //
    // //         // theme: { margin: { default: { .. }, sm: { .. }, md: { .. } } }
    // //         // margin-top--sm: calc(var(--margin-top) * 0.75)
    // //         // margin-right--sm: calc(var(--margin-top) * 0.75)
    // //         // margin-bottom--sm: calc(var(--margin-top) * 0.75)
    // //         // margin-left--sm: calc(var(--margin-top) * 0.75)
    // //         // margin--sm: var(--margin-top--sm) var(--margin-right--sm) var(--margin-bottom--sm) var(--margin-left--sm)
    // //     },
    //     color: {
    //         red: {
    //             100: { lighten: 80 }
    //
    //             // 100: ({ value, lighten }) => lighten(value, 80),
    //             // 200: ({ value, lighten }) => lighten(value, 60),
    //             // 300: ({ value, lighten }) => lighten(value, 40),
    //             // 400: ({ value, lighten }) => lighten(value, 20),
    //             // 500: ({ value }) => value,
    //             // 600: ({ value, darken }) => darken(value, 20),
    //             // 700: ({ value, darken }) => darken(value, 40),
    //             // 800: ({ value, darken }) => darken(value, 60),
    //             // 900: ({ value, darken }) => darken(value, 80)
    //             //
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
