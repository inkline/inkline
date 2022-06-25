import {ColorVariant, Configuration, NumberVariant} from './types';
import {
    animationResolvers,
    borderResolvers,
    boxShadowResolvers,
    breakpointsResolvers,
    colorResolvers,
    marginResolvers,
    paddingResolvers,
    scaleRatioResolvers,
    sizeResolvers,
    typographyResolvers
} from './resolvers';
import {
    animationGenerators,
    borderGenerators,
    boxShadowGenerators,
    breakpointsGenerators,
    colorGenerators,
    marginGenerators,
    paddingGenerators,
    scaleRatioGenerators,
    sizeGenerators,
    typographyGenerators
} from './generators';

const colorShades: Record<string, ColorVariant> = {
    100: { lightness: 10 },
    200: { lightness: 20 },
    300: { lightness: 30 },
    400: { lightness: 40 },
    500: { lightness: 50 },
    600: { lightness: 60 },
    700: { lightness: 70 },
    800: { lightness: 80 },
    900: { lightness: 90 }
};

const spacingVariants: Record<string, NumberVariant> = {
    xs: { multiply: 'var(--size-multiplier-xs)' },
    sm: { multiply: 'var(--size-multiplier-sm)' },
    md: { multiply: 'var(--size-multiplier-md)' },
    lg: { multiply: 'var(--size-multiplier-lg)' },
    xl: { multiply: 'var(--size-multiplier-xl)' },
    '1-5': { divide: 5 },
    '1-4': { divide: 4 },
    '3-4': { divide: 4, multiply: 3 },
    '1-3': { divide: 3 },
    '2-3': { divide: 3, multiply: 2 },
    '1-2': { divide: 2 },
    2: { multiply: 2 },
    3: { multiply: 3 },
    4: { multiply: 4 },
    5: { multiply: 5 }
};

export const defaultConfig: Configuration = {
    resolvers: [
        ...animationResolvers(),
        ...borderResolvers(),
        ...boxShadowResolvers(),
        ...breakpointsResolvers(),
        ...colorResolvers(),
        ...marginResolvers(),
        ...paddingResolvers(),
        ...scaleRatioResolvers(),
        ...sizeResolvers(),
        ...typographyResolvers()
    ],
    generators: [
        ...animationGenerators(),
        ...borderGenerators(),
        ...boxShadowGenerators(),
        ...breakpointsGenerators(),
        ...colorGenerators(),
        ...marginGenerators(),
        ...paddingGenerators(),
        ...scaleRatioGenerators(),
        ...sizeGenerators(),
        ...typographyGenerators()
    ],
    theme: {
        breakpoints: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
            '2xl': 1400
        },
        color: {
            red: '#ee1411',
            orange: '#f65809',
            yellow: '#ffbb00',
            green: '#36c989',
            teal: '#49b6ab',
            blue: '#1db1e2',
            purple: '#7559a6',
            pink: '#f20d61',
            white: '#ffffff',
            black: '#000000',
            primary: '<% theme.color.blue %>',
            secondary: '<% theme.color.purple %>',
            info: '<% theme.color.teal %>',
            success: '<% theme.color.green %>'
        },
        margin: '1rem',
        padding: '1rem',
        border: '1px solid #c4cdd0',
        scaleRatio: {
            minorSecond: 1.067,
            majorSecond: 1.125,
            minorThird: 1.2,
            majorThird: 1.25,
            perfectFourth: 1.333,
            augmentedFourth: 1.414,
            perfectFifth: 1.5,
            golden: 1.618,
            primary: 'var(--scale-ratio-minor-third)'
        },
        typography: {
            fontFamily: {
                primary: {
                    base: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif',
                    monospace: '\'SFMono-Regular\', Menlo, Monaco, Consolas, \'Liberation Mono\', \'Courier New\', monospace',
                    print: '\'Georgia\', \'Times New Roman\', \'Times\', serif'
                },
                secondary: {
                    base: 'var(--font-family-primary-base)',
                    monospace: 'var(--font-family-primary-monospace)',
                    print: 'var(--font-family-primary-print)'
                }
            },
            fontWeight: {
                extralight: 200,
                light: 300,
                normal: 'normal',
                semibold: 600,
                bold: 'bold',
                black: 900,
                lighter: 'lighter',
                bolder: 'bolder'
            },
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: 0
        },
        elements: {},
        components: {},
        variants: {
            color: {
                primary: colorShades,
                secondary: colorShades,
                info: colorShades,
                success: colorShades,
                warning: colorShades,
                danger: colorShades,
            },
            margin: spacingVariants,
            padding: spacingVariants,
            size: {
                multiplier: {
                    xs: { divide: 'var(--scale-ratio-pow-2)' },
                    sm: { divide: 'var(--scale-ratio-pow-1)' },
                    md: {},
                    lg: { multiply: 'var(--scale-ratio-pow-1)' },
                    xl: { multiply: 'var(--scale-ratio-pow-2)' }
                }
            },
            typography: {
                fontSize: {
                    xs: { multiply: 'var(--size-multiplier-xs)' },
                    sm: { multiply: 'var(--size-multiplier-sm)' },
                    md: { multiply: 'var(--size-multiplier-md)' },
                    lg: { multiply: 'var(--size-multiplier-lg)' },
                    xl: { multiply: 'var(--size-multiplier-xl)' }
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
