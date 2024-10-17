import {
    ref,
    selector,
    nsvariable,
    nsdefine,
    defaultDefinitionOptions,
    multiply,
    capitalize,
    keyframes
} from '@inkline/core';
import {
    useKeyMappedSizeMultiplier,
    defaultComponentSizes,
    ComponentSize,
    useBrandColors
} from '@inkline/theme';

const ns = 'loader';

export function useLoaderThemeVariables(options = defaultDefinitionOptions) {
    const { colorPrimary } = useBrandColors();

    return {
        ...nsdefine(
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

export function useLoaderThemeSizeFactory(size: ComponentSize) {
    const { loaderWidth, loaderHeight } = useLoaderThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[size]);

    const variantWidth = nsvariable(
        [ns, size] as const,
        'width',
        multiply(ref(loaderWidth), sizeMultiplierRef)
    );

    const variantHeight = nsvariable(
        [ns, size] as const,
        'height',
        multiply(ref(loaderHeight), sizeMultiplierRef)
    );

    selector(`.loader.-${size}`, {
        width: ref(variantWidth),
        height: ref(variantHeight)
    });
}

export function useLoaderThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(useLoaderThemeSizeFactory);
}

export function useLoaderThemeColorFactory(color: 'primary' | 'light' | 'dark') {
    const invertedColor = color === 'light' ? 'dark' : color === 'dark' ? 'light' : color;
    const colorKey = capitalize(invertedColor);
    const brandColors = useBrandColors();

    const variantColor = nsvariable(
        [ns, color] as const,
        `color`,
        ref(brandColors[`color${colorKey}`])
    );

    selector(`.loader.-${color} > svg > circle`, {
        stroke: ref(variantColor)
    });
}

export function useLoaderThemeColors({ colors = ['primary', 'light', 'dark'] as const } = {}) {
    colors.forEach(useLoaderThemeColorFactory);
}

export function useLoaderTheme() {
    useLoaderThemeLayout();
    useLoaderThemeBase();
    useLoaderThemeSizes();
    useLoaderThemeColors();
}
