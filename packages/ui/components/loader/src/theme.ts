import {
    ref,
    selector,
    nsvariables,
    defaultDefinitionOptions,
    multiply,
    keyframes,
    stripExportsNamespace
} from '@inkline/core';
import { capitalize } from '@inkline/utils';
import { useKeyMappedSizeMultiplier, useBrandColors } from '@inkline/theme';

const ns = 'loader';

const defaultLoaderColor = 'primary';
const defaultLoaderColors = ['primary', 'light', 'dark'] as const;

const defaultLoaderSize = 'md';
const defaultLoaderSizes = ['sm', 'md', 'lg'] as const;

type LoaderColorVariant = (typeof defaultLoaderColors)[number];
type LoaderSizeVariant = (typeof defaultLoaderSizes)[number];

export function useLoaderThemeVariables(options = defaultDefinitionOptions) {
    const { colorPrimary } = useBrandColors();

    return {
        ...nsvariables(
            ns,
            {
                animation: {
                    duration: '1.2s',
                    timingFunction: 'linear',
                    iterationCount: 'infinite'
                },
                color: ref(colorPrimary),
                width: '64px',
                height: '64px'
            },
            options
        )
    };
}

export function useLoaderThemeLayout() {
    const { loaderWidth, loaderHeight } = useLoaderThemeVariables();

    selector('.loader', {
        display: 'inline-block',
        position: 'relative',
        width: ref(loaderWidth),
        height: ref(loaderHeight)
    });

    selector('.loader::before', {
        content: '""',
        display: 'block',
        paddingTop: '100%'
    });

    selector(['.loader-text', '.loader > svg'], {
        position: 'absolute',
        height: '100%',
        width: '100%',
        inset: 0,
        margin: 'auto'
    });

    selector('.loader-text', {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    });

    selector('.loader.-auto', {
        width: '100%',
        height: '100%'
    });
}

export function useLoaderThemeBase() {
    const {
        loaderAnimationDirection,
        loaderAnimationIterationCount,
        loaderAnimationDuration,
        loaderColor
    } = useLoaderThemeVariables();

    selector('.loader > svg', {
        animationName: 'loader-rotate',
        animationDuration: ref(loaderAnimationDuration),
        animationDirection: ref(loaderAnimationDirection),
        animationIterationCount: ref(loaderAnimationIterationCount),
        transformOrigin: 'center center'
    });

    selector('.loader > svg > circle', {
        stroke: ref(loaderColor),
        strokeDasharray: '89, 200',
        strokeDashoffset: '-35px',
        animationName: 'loader-dash',
        animationDuration: ref(loaderAnimationDuration),
        animationDirection: ref(loaderAnimationDirection),
        animationIterationCount: ref(loaderAnimationIterationCount),
        strokeLinecap: 'round'
    });

    keyframes('loader-rotate', {
        '100%': {
            transform: 'rotate(360deg)'
        }
    });

    keyframes('loader-dash', {
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
    });
}

export function useLoaderThemeSizeFactory(variant: LoaderSizeVariant) {
    const { loaderWidth, loaderHeight } = useLoaderThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[variant]);
    const sizeNs = [ns, variant] as const;

    const { width, height } = stripExportsNamespace(
        nsvariables(sizeNs, {
            width: multiply(ref(loaderWidth), sizeMultiplierRef),
            height: multiply(ref(loaderHeight), sizeMultiplierRef)
        })
    );

    selector(`.loader.-${variant}`, {
        width: ref(width),
        height: ref(height)
    });
}

export function useLoaderThemeSizes(sizes = defaultLoaderSizes) {
    sizes.forEach(useLoaderThemeSizeFactory);
}

export function useLoaderThemeColorFactory(variant: LoaderColorVariant) {
    const invertedColor = variant === 'light' ? 'dark' : variant === 'dark' ? 'light' : variant;
    const colorKey = capitalize(invertedColor);
    const brandColors = useBrandColors();
    const colorNs = [ns, variant] as const;

    const { color } = stripExportsNamespace(
        nsvariables(colorNs, {
            color: ref(brandColors[`color${colorKey}`])
        })
    );

    selector(`.loader.-${variant} > svg > circle`, {
        stroke: ref(color)
    });
}

export function useLoaderThemeColors(colors = defaultLoaderColors) {
    colors.forEach(useLoaderThemeColorFactory);
}

export function useLoaderTheme() {
    useLoaderThemeLayout();
    useLoaderThemeBase();
    useLoaderThemeSizes();
    useLoaderThemeColors();
}
