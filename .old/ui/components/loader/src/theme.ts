import {
    ref,
    selector,
    nsvariables,
    multiply,
    keyframes,
    DefinitionOptions,
    defaultDefinitionOptions,
    setExportsNamespace,
    toVariableKey
} from '@inkline/core';
import { merge } from '@inkline/utils';
import { useBrandColors, useSpacing } from '@inkline/theme';

const ns = 'loader';

const defaultLoaderColor = 'light';
const defaultLoaderColors = ['primary', 'light', 'dark'] as const;

const defaultLoaderSize = 'md';
const defaultLoaderSizes = ['sm', 'md', 'lg'] as const;

type LoaderColorVariant = (typeof defaultLoaderColors)[number];
type LoaderSizeVariant = (typeof defaultLoaderSizes)[number];

/**
 * Config
 */

export function useLoaderThemeColorConfig(
    variant: LoaderColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorLight, colorDark, colorPrimary } = useBrandColors(options);

    return {
        light: {
            color: ref(colorDark)
        },
        dark: {
            color: ref(colorLight)
        },
        primary: {
            color: ref(colorPrimary)
        }
    }[variant];
}

export function useLoaderThemeSizeConfig(
    variant: LoaderSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacingSm, spacingMd, spacingLg } = useSpacing(options);

    return {
        sm: {
            width: multiply(ref(spacingSm), 4),
            height: multiply(ref(spacingSm), 4)
        },
        md: {
            width: multiply(ref(spacingMd), 4),
            height: multiply(ref(spacingMd), 4)
        },
        lg: {
            width: multiply(ref(spacingLg), 4),
            height: multiply(ref(spacingLg), 4)
        }
    }[variant];
}

export function useLoaderThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return merge(
        {
            animation: {
                duration: '1.2s',
                timingFunction: 'linear',
                iterationCount: 'infinite'
            }
        },
        useLoaderThemeColorConfig(defaultLoaderColor, options),
        useLoaderThemeSizeConfig(defaultLoaderSize, options)
    );
}

/**
 * Variables
 */

export function useLoaderThemeColorVariables(
    variant: LoaderColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useLoaderThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useLoaderThemeSizeVariables(
    variant: LoaderSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useLoaderThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useLoaderThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useLoaderThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useLoaderThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { loaderWidth, loaderHeight } = useLoaderThemeVariables(options);

    selector(
        '.loader',
        {
            display: 'inline-block',
            position: 'relative',
            width: ref(loaderWidth),
            height: ref(loaderHeight)
        },
        options
    );

    selector(
        '.loader::before',
        {
            content: '""',
            display: 'block',
            paddingTop: '100%'
        },
        options
    );

    selector(
        ['.loader-text', '.loader > svg'],
        {
            position: 'absolute',
            height: '100%',
            width: '100%',
            inset: 0,
            margin: 'auto'
        },
        options
    );

    selector(
        '.loader-text',
        {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        options
    );

    selector(
        '.loader.-auto',
        {
            width: '100%',
            height: '100%'
        },
        options
    );
}

export function useLoaderThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        loaderAnimationDirection,
        loaderAnimationIterationCount,
        loaderAnimationDuration,
        loaderColor
    } = useLoaderThemeVariables(options);

    selector(
        '.loader > svg',
        {
            animationName: 'loader-rotate',
            animationDuration: ref(loaderAnimationDuration),
            animationDirection: ref(loaderAnimationDirection),
            animationIterationCount: ref(loaderAnimationIterationCount),
            transformOrigin: 'center center'
        },
        options
    );

    selector(
        '.loader > svg > circle',
        {
            stroke: ref(loaderColor),
            strokeDasharray: '89, 200',
            strokeDashoffset: '-35px',
            animationName: 'loader-dash',
            animationDuration: ref(loaderAnimationDuration),
            animationDirection: ref(loaderAnimationDirection),
            animationIterationCount: ref(loaderAnimationIterationCount),
            strokeLinecap: 'round'
        },
        options
    );

    keyframes(
        'loader-rotate',
        {
            '100%': {
                transform: 'rotate(360deg)'
            }
        },
        options
    );

    keyframes(
        'loader-dash',
        {
            '0%': {
                strokeDasharray: '1, 200',
                strokeDashoffset: '0'
            },
            '50%': {
                strokeDasharray: '89, 200',
                strokeDashoffset: '-35px'
            },
            '100%': {
                strokeDasharray: '89, 200',
                strokeDashoffset: '-124px'
            }
        },
        options
    );
}

export function useLoaderThemeColorSelectors(
    variant: LoaderColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { loaderColor } = useLoaderThemeVariables(options);

    const { variantColor } = setExportsNamespace(
        useLoaderThemeColorVariables(variant, options),
        'variant'
    );

    selector(
        `.loader.-${variant}`,
        {
            [toVariableKey(loaderColor)]: ref(variantColor)
        },
        options
    );
}

export function useLoaderThemeSizeSelectors(
    variant: LoaderSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { loaderWidth, loaderHeight } = useLoaderThemeVariables(options);

    const { variantWidth, variantHeight } = setExportsNamespace(
        useLoaderThemeSizeVariables(variant, options),
        'variant'
    );

    selector(
        `.loader.-${variant}`,
        {
            [toVariableKey(loaderWidth)]: ref(variantWidth),
            [toVariableKey(loaderHeight)]: ref(variantHeight)
        },
        options
    );
}

export function useLoaderThemeSizes(sizes: LoaderSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useLoaderThemeSizeSelectors(size, options));
}

export function useLoaderThemeColors(colors: LoaderColorVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useLoaderThemeColorSelectors(color, options));
}

export function useLoaderTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useLoaderThemeLayoutSelectors(options);
    useLoaderThemeBaseSelectors(options);
    useLoaderThemeColors([...defaultLoaderColors], options);
    useLoaderThemeSizes([...defaultLoaderSizes], options);
}
