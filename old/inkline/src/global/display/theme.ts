import {
    defaultDefinitionOptions,
    multiply,
    namespace,
    nsvariable,
    ref,
    selector,
    useFontFamily,
    useFontSize,
    useFontStyle,
    useFontWeight,
    useMarginBase,
    useScaleRatio
} from '@inkline/config';

const ns = 'display';

export function useDisplayThemeVariables(options = defaultDefinitionOptions) {
    const { marginBottom } = useMarginBase();
    const { fontFamilyBaseSecondary } = useFontFamily();
    const { fontStyleNormal } = useFontStyle();
    const { fontSize } = useFontSize();
    const { fontWeightBold } = useFontWeight();

    const { scaleRatioPow1, scaleRatioPow2, scaleRatioPow3, scaleRatioPow4, scaleRatioPow5 } =
        useScaleRatio();

    const displayMarginBottom = namespace(ns, marginBottom, options);
    const displayFontFamily = nsvariable(ns, 'font-family', ref(fontFamilyBaseSecondary), options);
    const displayFontStyle = nsvariable(ns, 'font-style', ref(fontStyleNormal), options);
    const displayFontWeight = nsvariable(ns, 'font-weight', ref(fontWeightBold), options);
    const displayLineHeight = nsvariable(ns, 'line-height', 1.2, options);

    const d6FontSize = nsvariable(
        'd6',
        'font-size',
        multiply(ref(fontSize), ref(scaleRatioPow5)),
        options
    );

    const d5FontSize = nsvariable(
        'd5',
        'font-size',
        multiply(ref(fontSize), ref(scaleRatioPow5), ref(scaleRatioPow1)),
        options
    );

    const d4FontSize = nsvariable(
        'd4',
        'font-size',
        multiply(ref(fontSize), ref(scaleRatioPow5), ref(scaleRatioPow2)),
        options
    );

    const d3FontSize = nsvariable(
        'd3',
        'font-size',
        multiply(ref(fontSize), ref(scaleRatioPow5), ref(scaleRatioPow3)),
        options
    );

    const d2FontSize = nsvariable(
        'd2',
        'font-size',
        multiply(ref(fontSize), ref(scaleRatioPow5), ref(scaleRatioPow4)),
        options
    );

    const d1FontSize = nsvariable(
        'd1',
        'font-size',
        multiply(ref(fontSize), ref(scaleRatioPow5), ref(scaleRatioPow5)),
        options
    );

    return {
        displayMarginBottom,
        displayFontFamily,
        displayFontStyle,
        displayFontWeight,
        displayLineHeight,
        d1FontSize,
        d2FontSize,
        d3FontSize,
        d4FontSize,
        d5FontSize,
        d6FontSize
    };
}

export function useDisplayThemeBase() {
    const {
        displayMarginBottom,
        displayFontFamily,
        displayFontStyle,
        displayFontWeight,
        displayLineHeight,
        d1FontSize,
        d2FontSize,
        d3FontSize,
        d4FontSize,
        d5FontSize,
        d6FontSize
    } = useDisplayThemeVariables();

    selector('.d1, .d2, .d3, .d4, .d5, .d6', {
        marginBottom: ref(displayMarginBottom),
        fontFamily: ref(displayFontFamily),
        fontStyle: ref(displayFontStyle),
        fontWeight: ref(displayFontWeight),
        color: 'inherit',
        lineHeight: ref(displayLineHeight)
    });

    selector('.d6', {
        fontSize: ref(d6FontSize)
    });

    selector('.d5', {
        fontSize: ref(d5FontSize)
    });

    selector('.d4', {
        fontSize: ref(d4FontSize)
    });

    selector('.d3', {
        fontSize: ref(d3FontSize)
    });

    selector('.d2', {
        fontSize: ref(d2FontSize)
    });

    selector('.d1', {
        fontSize: ref(d1FontSize)
    });
}

export function useDisplayTheme() {
    useDisplayThemeVariables();
    useDisplayThemeBase();
}
