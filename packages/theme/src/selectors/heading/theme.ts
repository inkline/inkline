import {
    defaultDefinitionOptions,
    multiply,
    addVariableNamespace,
    nsvariable,
    ref,
    selector
} from '@inkline/core';
import {
    useFontFamily,
    useFontSize,
    useFontStyle,
    useFontWeight,
    useMarginBase,
    useScaleRatio
} from '../../variables';

const ns = 'heading';

export function useHeadingThemeVariables(options = defaultDefinitionOptions) {
    const { marginBottom } = useMarginBase();
    const { fontFamilyBaseSecondary } = useFontFamily();
    const { fontStyleNormal } = useFontStyle();
    const { fontSize } = useFontSize();
    const { fontWeightBold } = useFontWeight();

    const { scaleRatioPow1, scaleRatioPow2, scaleRatioPow3, scaleRatioPow4, scaleRatioPow5 } =
        useScaleRatio();

    const headingMarginBottom = addVariableNamespace(ns, marginBottom, options);
    const headingFontFamily = nsvariable(ns, 'font-family', ref(fontFamilyBaseSecondary), options);
    const headingFontStyle = nsvariable(ns, 'font-style', ref(fontStyleNormal), options);
    const headingFontWeight = nsvariable(ns, 'font-weight', ref(fontWeightBold), options);
    const headingLineHeight = nsvariable(ns, 'line-height', 1.2, options);

    const h6FontSize = nsvariable('h6', 'font-size', ref(fontSize), options);

    const h5FontSize = nsvariable(
        'h5',
        'font-size',
        multiply(ref(fontSize), ref(scaleRatioPow1)),
        options
    );

    const h4FontSize = nsvariable(
        'h4',
        'font-size',
        multiply(ref(fontSize), ref(scaleRatioPow2)),
        options
    );

    const h3FontSize = nsvariable(
        'h3',
        'font-size',
        multiply(ref(fontSize), ref(scaleRatioPow3)),
        options
    );

    const h2FontSize = nsvariable(
        'h2',
        'font-size',
        multiply(ref(fontSize), ref(scaleRatioPow4)),
        options
    );

    const h1FontSize = nsvariable(
        'h1',
        'font-size',
        multiply(ref(fontSize), ref(scaleRatioPow5)),
        options
    );

    return {
        headingMarginBottom,
        headingFontFamily,
        headingFontStyle,
        headingFontWeight,
        headingLineHeight,
        h1FontSize,
        h2FontSize,
        h3FontSize,
        h4FontSize,
        h5FontSize,
        h6FontSize
    };
}

export function useHeadingThemeBase() {
    const {
        headingMarginBottom,
        headingFontFamily,
        headingFontStyle,
        headingFontWeight,
        headingLineHeight,
        h1FontSize,
        h2FontSize,
        h3FontSize,
        h4FontSize,
        h5FontSize,
        h6FontSize
    } = useHeadingThemeVariables();

    selector('h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6', {
        marginBottom: ref(headingMarginBottom),
        fontFamily: ref(headingFontFamily),
        fontStyle: ref(headingFontStyle),
        fontWeight: ref(headingFontWeight),
        color: 'inherit',
        lineHeight: ref(headingLineHeight)
    });

    selector('h6, .h6', {
        fontSize: ref(h6FontSize)
    });

    selector('h5, .h5', {
        fontSize: ref(h5FontSize)
    });

    selector('h4, .h4', {
        fontSize: ref(h4FontSize)
    });

    selector('h3, .h3', {
        fontSize: ref(h3FontSize)
    });

    selector('h2, .h2', {
        fontSize: ref(h2FontSize)
    });

    selector('h1, .h1', {
        fontSize: ref(h1FontSize)
    });
}

export function useHeadingTheme() {
    useHeadingThemeVariables();
    useHeadingThemeBase();
}
