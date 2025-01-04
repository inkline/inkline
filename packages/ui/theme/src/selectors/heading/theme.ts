import {
    defaultDefinitionOptions,
    ref,
    selector, nsvariables, vref
} from '@inkline/core';
import {
    useFontFamily,
    useFontSize,
    useFontStyle,
    useFontWeight,
    useSpacing
} from '../../variables';

const ns = 'heading';

export function useH1Config() {
    const { fontSize4Xl } = useFontSize();

    return {
        fontSize: ref(fontSize4Xl)
    };
}

export function useH2Config() {
    const { fontSize3Xl } = useFontSize();

    return {
        fontSize: ref(fontSize3Xl)
    };
}

export function useH3Config() {
    const { fontSize2Xl } = useFontSize();

    return {
        fontSize: ref(fontSize2Xl)
    };
}

export function useH4Config() {
    const { fontSizeXl } = useFontSize();

    return {
        fontSize: ref(fontSizeXl)
    };
}

export function useH5Config() {
    const { fontSizeLg } = useFontSize();

    return {
        fontSize: ref(fontSizeLg)
    };
}

export function useH6Config() {
    const { fontSizeMd } = useFontSize();

    return {
        fontSize: ref(fontSizeMd)
    };
}

export function useHeadingConfig() {
    const { spacing } = useSpacing();
    const { fontFamilyBaseSecondary } = useFontFamily();
    const { fontStyleNormal } = useFontStyle();
    const { fontWeightBold } = useFontWeight();

    return {
        margin: {
            bottom: ref(spacing)
        },
        fontFamily: ref(fontFamilyBaseSecondary),
        fontStyle: ref(fontStyleNormal),
        fontWeight: ref(fontWeightBold),
        lineHeight: 1.2
    };
}

export function useHeadingThemeVariables(options = defaultDefinitionOptions) {
    return {
        ...nsvariables(ns, useHeadingConfig(), options),
        ...nsvariables('h1', useH1Config(), options),
        ...nsvariables('h2', useH2Config(), options),
        ...nsvariables('h3', useH3Config(), options),
        ...nsvariables('h4', useH4Config(), options),
        ...nsvariables('h5', useH5Config(), options),
        ...nsvariables('h6', useH6Config(), options)
    };
}

export function useHeadingThemeSelectors() {
    const {
        headingMargin,
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
        margin: vref(headingMargin),
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
    useHeadingThemeSelectors();
}
