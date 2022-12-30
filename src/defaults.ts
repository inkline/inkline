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

const colorShadeAndTintVariants: Record<string, ColorPropertyVariant> = {
    'shade-150': { darken: 15 },
    'shade-100': { darken: 10 },
    'shade-50': { darken: 5 },
    'tint-50': { lighten: 5 },
    'tint-100': { lighten: 10 },
    'tint-150': { lighten: 15 }
};

const colorLightnessVariants: Record<string, ColorPropertyVariant> = {
    50: { lightness: 95 },
    100: { lightness: 90 },
    200: { lightness: 80 },
    300: { lightness: 70 },
    400: { lightness: 60 },
    500: { lightness: 50 },
    600: { lightness: 40 },
    700: { lightness: 30 },
    800: { lightness: 20 },
    900: { lightness: 10 }
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
            boxShadow: {
                offsetX: '0',
                offsetY: '0.5rem',
                blurRadius: '1rem',
                spreadRadius: '-0.75rem',
                color: 'rgba(0, 0, 0, 0.15)'
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
                red: '#f2413d',
                orange: '#f98e5a',
                yellow: '#ffda77',
                green: '#2fb079',
                teal: '#48b4a9',
                blue: '#178bb2',
                purple: '#8268ae',
                pink: '#fc778a',
                white: '#ffffff',
                light: 'var(--color-gray-100)',
                gray: '#8e9fa4',
                dark: 'var(--color-gray-800)',
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
                        base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
                        monospace:
                            "'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        print: "'Georgia', 'Times New Roman', 'Times', serif"
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
                letterSpacing: 0,
                color: {
                    dark: 'var(--color-gray-900)',
                    muted: 'var(--color-gray-600)',
                    light: 'var(--color-gray-100)'
                },
                contrastColor: {
                    light: 'var(--color-gray-900)',
                    dark: 'var(--color-white)'
                }
            },
            elements: {
                body: {
                    background: 'var(--color-white)',
                    color: 'var(--color-gray-900)'
                },
                grid: {
                    columns: 12,
                    gutter: '28px',
                    xs: {
                        gutter: 'calc(var(--grid--gutter) * var(--size-multiplier-xs))',
                        width: '100%'
                    },
                    sm: {
                        gutter: 'calc(var(--grid--gutter) * var(--size-multiplier-sm))',
                        width: 'calc(var(--breakpoint-sm) - var(--grid--sm--gutter))'
                    },
                    md: {
                        gutter: 'calc(var(--grid--gutter) * var(--size-multiplier-md))',
                        width: 'calc(var(--breakpoint-md) - var(--grid--md--gutter))'
                    },
                    lg: {
                        gutter: 'calc(var(--grid--gutter) * var(--size-multiplier-lg))',
                        width: 'calc(var(--breakpoint-lg) - var(--grid--lg--gutter))'
                    },
                    xl: {
                        gutter: 'calc(var(--grid--gutter) * var(--size-multiplier-xl))',
                        width: 'calc(var(--breakpoint-xl) - var(--grid--xl--gutter))'
                    },
                    '2xl': {
                        gutter: 'calc(var(--grid--gutter) * var(--size-multiplier-2xl))',
                        width: 'calc(var(--breakpoint-2xl) - var(--grid--2xl--gutter))'
                    }
                }
            },
            variants: {
                borderRadius: sizeMultiplierVariants,
                color: {
                    primary: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    secondary: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    info: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    success: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    warning: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    danger: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    gray: {
                        ...colorShadeAndTintVariants,
                        ...colorLightnessVariants
                    },
                    light: colorShadeAndTintVariants,
                    dark: colorShadeAndTintVariants
                },
                margin: spacingVariants,
                padding: spacingVariants,
                size: {
                    multiplier: {
                        '2xs': { divide: 'var(--scale-ratio-pow-3)' },
                        xs: { divide: 'var(--scale-ratio-pow-2)' },
                        sm: { divide: 'var(--scale-ratio-pow-1)' },
                        md: {},
                        lg: { multiply: 'var(--scale-ratio-pow-1)' },
                        xl: { multiply: 'var(--scale-ratio-pow-2)' },
                        '2xl': { multiply: 'var(--scale-ratio-pow-3)' }
                    }
                },
                typography: {
                    fontSize: sizeMultiplierVariants
                }
            }
        },
        dark: {
            border: {
                color: '#4a4a4c'
            },
            typography: {
                color: {
                    muted: 'var(--color-gray-400)'
                }
            },
            elements: {
                body: {
                    background: 'var(--color-gray-800)',
                    color: 'var(--color-gray-100)'
                }
            }
        }
    },
    build: {
        extName: '.scss',
        themeSelector: '.<% themeName %>-theme'
    }
};
