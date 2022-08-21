import { ColorPropertyVariant, Configuration, NumberPropertyVariant } from './types';
import {
    animationResolvers,
    borderResolvers,
    borderRadiusResolvers,
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
    borderRadiusGenerators,
    boxShadowGenerators,
    breakpointsGenerators,
    colorGenerators,
    marginGenerators,
    paddingGenerators,
    scaleRatioGenerators,
    sizeGenerators,
    typographyGenerators
} from './generators';

const colorShadeVariants: Record<string, ColorPropertyVariant> = {
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

const sizeMultiplierVariants: Record<string, NumberPropertyVariant> = {
    xs: { multiply: 'var(--size-multiplier-xs)' },
    sm: { multiply: 'var(--size-multiplier-sm)' },
    md: { multiply: 'var(--size-multiplier-md)' },
    lg: { multiply: 'var(--size-multiplier-lg)' },
    xl: { multiply: 'var(--size-multiplier-xl)' }
};

const spacingVariants: Record<string, NumberPropertyVariant> = {
    ...sizeMultiplierVariants,
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
        ...animationResolvers,
        ...borderResolvers,
        ...borderRadiusResolvers,
        ...boxShadowResolvers,
        ...breakpointsResolvers,
        ...colorResolvers,
        ...marginResolvers,
        ...paddingResolvers,
        ...scaleRatioResolvers,
        ...sizeResolvers,
        ...typographyResolvers
    ],
    generators: [
        ...animationGenerators,
        ...borderGenerators,
        ...borderRadiusGenerators,
        ...boxShadowGenerators,
        ...breakpointsGenerators,
        ...colorGenerators,
        ...marginGenerators,
        ...paddingGenerators,
        ...scaleRatioGenerators,
        ...sizeGenerators,
        ...typographyGenerators
    ],
    theme: {
        default: {
            animation: {
                duration: '300ms',
                timingFunction: 'ease'
            },
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
                success: '<% theme.color.green %>',
                warning: '<% theme.color.yellow %>',
                danger: '<% theme.color.red %>'
            },
            margin: '1rem',
            padding: '1rem',
            border: '1px solid #c4cdd0',
            borderRadius: '4px',
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
            size: {
                multiplier: 1,
                percentages: {
                    0: '0%',
                    25: '25%',
                    50: '50%',
                    75: '75%',
                    100: '100%'
                }
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
            // elements: { // @TODO Add support for elements and components
            //     body: {
            //         background: 'var(--color-white)' // var(--body--background)
            //         color: 'var(--color-gray-90)' // var(--body--color)
            //     }
            // },
            // components: {
            //     alert: {
            //         info: {}
            //     }
            // },
            variants: {
                borderRadius: sizeMultiplierVariants,
                color: {
                    primary: colorShadeVariants,
                    secondary: colorShadeVariants,
                    info: colorShadeVariants,
                    success: colorShadeVariants,
                    warning: colorShadeVariants,
                    danger: colorShadeVariants
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
                    fontSize: sizeMultiplierVariants
                }
            }
        },
        dark: {
            color: {
                red: '#ff0000'
            },
            border: {
                color: '#4a4a4c'
            }
        }
    },
    build: {
        extName: '.scss',
        themeSelector: '.<% themeName %>-theme'
    }
};
