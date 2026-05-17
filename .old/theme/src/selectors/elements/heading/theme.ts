import {
    ref,
    selector, nsvariables, vref, DefinitionOptions, defaultDefinitionOptions
} from '@inkline/core';
import {
    useFontFamily,
    useFontSize,
    useFontStyle,
    useFontWeight,
    useSpacing
} from '../../../variables';

const ns = 'heading';

export function useH1Config(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSize4Xl } = useFontSize(options);

    return {
        fontSize: ref(fontSize4Xl)
    };
}

export function useH2Config(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSize3Xl } = useFontSize(options);

    return {
        fontSize: ref(fontSize3Xl)
    };
}

export function useH3Config(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSize2Xl } = useFontSize(options);

    return {
        fontSize: ref(fontSize2Xl)
    };
}

export function useH4Config(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSizeXl } = useFontSize(options);

    return {
        fontSize: ref(fontSizeXl)
    };
}

export function useH5Config(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSizeLg } = useFontSize(options);

    return {
        fontSize: ref(fontSizeLg)
    };
}

export function useH6Config(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSizeMd } = useFontSize(options);

    return {
        fontSize: ref(fontSizeMd)
    };
}

export function useHeadingConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacing } = useSpacing(options);
    const { fontFamilyBaseSecondary } = useFontFamily(options);
    const { fontStyleNormal } = useFontStyle(options);
    const { fontWeightBold } = useFontWeight(options);

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

export function useHeadingThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return {
        ...nsvariables(ns, useHeadingConfig(options), options),
        ...nsvariables('h1', useH1Config(options), options),
        ...nsvariables('h2', useH2Config(options), options),
        ...nsvariables('h3', useH3Config(options), options),
        ...nsvariables('h4', useH4Config(options), options),
        ...nsvariables('h5', useH5Config(options), options),
        ...nsvariables('h6', useH6Config(options), options)
    };
}

export function useHeadingThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

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
    } = useHeadingThemeVariables(options);

    selector('h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6', {
        margin: vref(headingMargin),
        fontFamily: ref(headingFontFamily),
        fontStyle: ref(headingFontStyle),
        fontWeight: ref(headingFontWeight),
        color: 'inherit',
        lineHeight: ref(headingLineHeight)
    }, options);

    selector('h6, .h6', {
        fontSize: ref(h6FontSize)
    }, options);

    selector('h5, .h5', {
        fontSize: ref(h5FontSize)
    }, options);

    selector('h4, .h4', {
        fontSize: ref(h4FontSize)
    }, options);

    selector('h3, .h3', {
        fontSize: ref(h3FontSize)
    }, options);

    selector('h2, .h2', {
        fontSize: ref(h2FontSize)
    }, options);

    selector('h1, .h1', {
        fontSize: ref(h1FontSize)
    }, options);
}

export function useHeadingTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useHeadingThemeVariables(options);
    useHeadingThemeSelectors(options);
}
