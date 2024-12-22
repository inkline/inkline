import {
    multiply,
    ref,
    selector,
    defaultDefinitionOptions,
    nsvariables,
    stripExportsNamespace
} from '@inkline/core';
import { capitalize } from '@inkline/utils';
import {
    useFontSize,
    useKeyMappedSizeMultiplier,
    usePaddingBase,
    useContrastTextColor,
    useMarginBase,
    useTextColor
} from '@inkline/theme';

const ns = 'breadcrumb';

const defaultBreadcrumbColor = 'light';
const defaultBreadcrumbColors = ['light', 'dark'] as const;

const defaultBreadcrumbSize = 'md';
const defaultBreadcrumbSizes = ['sm', 'md', 'lg'] as const;

type BreadcrumbColorVariant = (typeof defaultBreadcrumbColors)[number];
type BreadcrumbSizeVariant = (typeof defaultBreadcrumbSizes)[number];

export function useBreadcrumbThemeVariables(options = defaultDefinitionOptions) {
    const { marginBottom } = useMarginBase();
    const { paddingRight, paddingLeft } = usePaddingBase();
    const { fontSize } = useFontSize();
    const { textColorWeaker } = useTextColor();

    return {
        ...nsvariables(
            ns,
            {
                fontSize: ref(fontSize),
                margin: {
                    bottom: ref(marginBottom)
                },
                padding: {
                    top: 0,
                    right: ref(paddingRight),
                    bottom: 0,
                    left: ref(paddingLeft)
                },
                separator: '"/"'
            },
            options
        ),
        ...nsvariables([ns, 'active'] as const, {
            color: ref(textColorWeaker)
        })
    };
}

export function useBreadcrumbThemeLayout() {
    selector('.breadcrumb', {
        display: 'flex'
    });

    selector('.breadcrumb ol', {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 0,
        listStyle: 'none'
    });
}

export function useBreadcrumbThemeBase() {
    const { breadcrumbPadding, breadcrumbMargin, breadcrumbFontSize } =
        useBreadcrumbThemeVariables();

    selector('.breadcrumb', {
        fontSize: ref(breadcrumbFontSize),
        padding: ref(breadcrumbPadding),
        margin: ref(breadcrumbMargin)
    });
}

export function useBreadcrumbThemeSizeFactory(variant: BreadcrumbSizeVariant) {
    const {
        breadcrumbPaddingTop,
        breadcrumbPaddingRight,
        breadcrumbPaddingBottom,
        breadcrumbPaddingLeft,
        breadcrumbFontSize
    } = useBreadcrumbThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[variant]);
    const sizeNs = [ns, variant] as const;

    const { fontSize, paddingTop, paddingRight, paddingBottom, paddingLeft } =
        stripExportsNamespace(
            nsvariables(sizeNs, {
                fontSize: multiply(ref(breadcrumbFontSize), sizeMultiplierRef),
                padding: {
                    top: multiply(ref(breadcrumbPaddingTop), sizeMultiplierRef),
                    right: multiply(ref(breadcrumbPaddingRight), sizeMultiplierRef),
                    bottom: multiply(ref(breadcrumbPaddingBottom), sizeMultiplierRef),
                    left: multiply(ref(breadcrumbPaddingLeft), sizeMultiplierRef)
                }
            })
        );

    selector(`.breadcrumb.-${variant}`, {
        fontSize: ref(fontSize),
        padding: [ref(paddingTop), ref(paddingRight), ref(paddingBottom), ref(paddingLeft)]
    });
}

export function useBreadcrumbThemeSizes(sizes = defaultBreadcrumbSizes) {
    sizes.forEach(useBreadcrumbThemeSizeFactory);
}

export function useBreadcrumbThemeColorFactory(variant: BreadcrumbColorVariant) {
    const colorKey = capitalize(variant);
    const contrastTextColors = useContrastTextColor();
    const colorNs = [ns, variant] as const;

    const { color } = stripExportsNamespace(
        nsvariables(colorNs, {
            color: ref(contrastTextColors[`contrastTextColor${colorKey}`])
        })
    );

    selector(`.breadcrumb.-${variant}`, {
        color: ref(color)
    });
}

export function useBreadcrumbThemeColors(colors = defaultBreadcrumbColors) {
    colors.forEach(useBreadcrumbThemeColorFactory);
}

export function useBreadcrumbTheme() {
    useBreadcrumbThemeLayout();
    useBreadcrumbThemeBase();
    useBreadcrumbThemeSizes();
    useBreadcrumbThemeColors();
}
