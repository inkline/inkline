import {
    ComponentSize,
    ComponentBrandColor,
    capitalize,
    multiply,
    ref,
    selector,
    nsvariable,
    useFontSize,
    useKeyMappedSizeMultiplier,
    usePaddingBase,
    useContrastTextColor,
    useMarginBase,
    defaultComponentSizes,
    defaultDefinitionOptions,
    defaultComponentNeutralColors,
    useTextColor,
    nsdefine
} from '@inkline/config';

const ns = 'breadcrumb' as const;

export function useBreadcrumbThemeVariables(options = defaultDefinitionOptions) {
    const { marginBottom } = useMarginBase();
    const { paddingRight, paddingLeft } = usePaddingBase();
    const { fontSize } = useFontSize();
    const { textColorWeaker } = useTextColor();

    return {
        ...nsdefine(
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
        ...nsdefine([ns, 'active'] as const, {
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

export function useBreadcrumbThemeSizeFactory(size: ComponentSize) {
    const {
        breadcrumbPaddingTop,
        breadcrumbPaddingRight,
        breadcrumbPaddingBottom,
        breadcrumbPaddingLeft,
        breadcrumbFontSize
    } = useBreadcrumbThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[size]);

    const variantPaddingTop = nsvariable(
        [ns, size],
        'padding-top',
        multiply(ref(breadcrumbPaddingTop), sizeMultiplierRef)
    );
    const variantPaddingRight = nsvariable(
        [ns, size],
        `padding-right`,
        multiply(ref(breadcrumbPaddingRight), sizeMultiplierRef)
    );
    const variantPaddingBottom = nsvariable(
        [ns, size],
        `padding-bottom`,
        multiply(ref(breadcrumbPaddingBottom), sizeMultiplierRef)
    );
    const variantPaddingLeft = nsvariable(
        [ns, size],
        `padding-left`,
        multiply(ref(breadcrumbPaddingLeft), sizeMultiplierRef)
    );

    const variantFontSize = nsvariable([ns, size], 'font-size', ref(breadcrumbFontSize));

    selector(`.breadcrumb.-${size}`, {
        fontSize: ref(variantFontSize),
        padding: [
            ref(variantPaddingTop),
            ref(variantPaddingRight),
            ref(variantPaddingBottom),
            ref(variantPaddingLeft)
        ]
    });
}

export function useBreadcrumbThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(useBreadcrumbThemeSizeFactory);
}

export function useBreadcrumbThemeColorFactory(color: ComponentBrandColor) {
    const colorKey = capitalize(color);
    const contrastTextColors = useContrastTextColor();

    const variantColor = nsvariable(
        [ns, color],
        `color`,
        ref(contrastTextColors[`contrastTextColor${colorKey}`])
    );

    selector(`.breadcrumb.-${color}`, {
        color: ref(variantColor)
    });
}

export function useBreadcrumbThemeColors({ colors = defaultComponentNeutralColors } = {}) {
    colors.forEach(useBreadcrumbThemeColorFactory);
}

export function useBreadcrumbTheme() {
    useBreadcrumbThemeLayout();
    useBreadcrumbThemeBase();
    useBreadcrumbThemeSizes();
    useBreadcrumbThemeColors();
}
