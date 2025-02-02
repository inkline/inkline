import {
    useFontSize,
    useColors,
    useFontWeight,
    useFontFamily,
    useLineHeight,
    useLetterSpacing,
    useHeadingThemeVariables,
    useSpacing
} from '@inkline/theme';
import {
    ref,
    selector,
    DefinitionOptions,
    defaultDefinitionOptions,
    nsvariables
} from '@inkline/core';

const ns = 'typography';

/**
 * Config
 */

export function useLeadConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSizeLg } = useFontSize(options);
    const { fontWeightLight } = useFontWeight(options);

    return {
        fontSize: ref(fontSizeLg),
        fontWeight: ref(fontWeightLight)
    };
}

export function useInitialismConfig(_userOptions: DefinitionOptions) {
    return {
        fontSize: '90%',
        textTransform: 'uppercase'
    };
}

export function useTypographyConfig(userOptions: DefinitionOptions) {
    return {
        lead: useLeadConfig(userOptions),
        initialism: useInitialismConfig(userOptions)
    };
}

/**
 * Variables
 */

export function useTypographyVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useTypographyConfig(options), options);
}

/**
 * Selectors
 */

export function useTypographyThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        typographyLeadFontSize,
        typographyLeadFontWeight,
        typographyInitialismFontSize,
        typographyInitialismTextTransform
    } = useTypographyVariables(options);

    const { fontWeight } = useFontWeight(options);
    const { fontFamilyBase } = useFontFamily(options);
    const { fontSize } = useFontSize(options);
    const { lineHeight } = useLineHeight(options);
    const { letterSpacing } = useLetterSpacing(options);

    selector(
        '.typography',
        {
            display: 'block',
            fontWeight: ref(fontWeight),
            fontFamily: ref(fontFamilyBase),
            fontSize: ref(fontSize),
            lineHeight: ref(lineHeight),
            letterSpacing: ref(letterSpacing)
        },
        options
    );

    // Font size

    const {
        fontSizeXs,
        fontSizeSm,
        fontSizeMd,
        fontSizeLg,
        fontSizeXl,
        fontSize2Xl,
        fontSize3Xl,
        fontSize4Xl
    } = useFontSize(options);

    [
        fontSizeXs,
        fontSizeSm,
        fontSizeMd,
        fontSizeLg,
        fontSizeXl,
        fontSize2Xl,
        fontSize3Xl,
        fontSize4Xl
    ].forEach((fontSize) => {
        selector(
            `.typography.-${fontSize.__name}`,
            {
                fontSize: ref(fontSize)
            },
            options
        );
    });

    const { h1FontSize, h2FontSize, h3FontSize, h4FontSize, h5FontSize, h6FontSize } =
        useHeadingThemeVariables(options);

    [h1FontSize, h2FontSize, h3FontSize, h4FontSize, h5FontSize, h6FontSize].forEach(
        (fontSize, index) => {
            selector(
                `.typography.-font-size-h${index + 1}`,
                {
                    fontSize: ref(fontSize)
                },
                options
            );
        }
    );

    // Color

    const {
        colorPrimary,
        colorSecondary,
        colorSuccess,
        colorDanger,
        colorWarning,
        colorInfo,
        colorLight,
        colorDark
    } = useColors(options);

    [
        colorPrimary,
        colorSecondary,
        colorSuccess,
        colorDanger,
        colorWarning,
        colorInfo,
        colorLight,
        colorDark
    ].forEach((color) => {
        selector(
            `.typography.-${color.__name}`,
            {
                color: ref(color)
            },
            options
        );
    });

    // Align

    ['left', 'center', 'right', 'justify'].forEach((align) => {
        selector(
            `.typography.-align-${align}`,
            {
                textAlign: align
            },
            options
        );
    });

    // Text decoration

    ['underline', 'line-through', 'overline'].forEach((textDecoration) => {
        selector(
            `.typography.-text-decoration-${textDecoration}`,
            {
                textDecoration: textDecoration
            },
            options
        );
    });

    // Font weight

    const {
        fontWeightExtralight,
        fontWeightLight,
        fontWeightNormal,
        fontWeightMedium,
        fontWeightSemibold,
        fontWeightBold,
        fontWeightBlack,
        fontWeightLighter,
        fontWeightBolder
    } = useFontWeight(options);

    [
        fontWeightExtralight,
        fontWeightLight,
        fontWeightNormal,
        fontWeightMedium,
        fontWeightSemibold,
        fontWeightBold,
        fontWeightBlack,
        fontWeightLighter,
        fontWeightBolder
    ].forEach((fontWeight) => {
        selector(
            `.typography.-${fontWeight.__name}`,
            {
                fontWeight: ref(fontWeight)
            },
            options
        );
    });

    // Line height

    const {
        lineHeightTight,
        lineHeightSnug,
        lineHeightNormal,
        lineHeightRelaxed,
        lineHeightLoose
    } = useLineHeight(options);

    [lineHeightTight, lineHeightSnug, lineHeightNormal, lineHeightRelaxed, lineHeightLoose].forEach(
        (lineHeight) => {
            selector(
                `.typography.-${lineHeight.__name}`,
                {
                    lineHeight: ref(lineHeight)
                },
                options
            );
        }
    );

    // Letter spacing

    const {
        letterSpacingTighter,
        letterSpacingTight,
        letterSpacingNormal,
        letterSpacingWide,
        letterSpacingWider
    } = useLetterSpacing(options);

    [
        letterSpacingTighter,
        letterSpacingTight,
        letterSpacingNormal,
        letterSpacingWide,
        letterSpacingWider
    ].forEach((letterSpacing) => {
        selector(
            `.typography.-${letterSpacing.__name}`,
            {
                letterSpacing: ref(letterSpacing)
            },
            options
        );
    });

    // Truncate

    selector(
        '.typography.-truncate',
        {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        options
    );

    // Line clamp

    selector(
        `.typography[class*="-line-clamp"]`,
        {
            display: '-webkit-box',
            overflow: 'hidden',
            '-webkit-box-orient': 'vertical'
        },
        options
    );

    [1, 2, 3, 4].forEach((lineClamp) => {
        selector(
            `.typography.-line-clamp-${lineClamp}`,
            {
                '-webkit-line-clamp': lineClamp
            },
            options
        );
    });

    // Text transform

    [
        'uppercase',
        'lowercase',
        'capitalize',
        'full-width',
        'full-size-kana',
        'math-auto',
        'none'
    ].forEach((textTransform) => {
        selector(
            `.typography.-text-transform-${textTransform}`,
            {
                textTransform
            },
            options
        );
    });

    // No wrap

    selector(
        '.typography.-no-wrap',
        {
            whiteSpace: 'nowrap'
        },
        options
    );

    // Gutter bottom

    const { spacing } = useSpacing(options);

    selector(
        '.typography.-gutter-bottom:not(h1, h2, h3, h4, h5, h6, p)',
        {
            marginBottom: ref(spacing)
        },
        options
    );

    // Lead

    selector(
        ['.lead', '.typography.-lead'],
        {
            fontSize: ref(typographyLeadFontSize),
            fontWeight: ref(typographyLeadFontWeight)
        },
        options
    );

    // Initialism

    selector(
        ['.initialism', '.typography.-initialism'],
        {
            fontSize: ref(typographyInitialismFontSize),
            textTransform: ref(typographyInitialismTextTransform)
        },
        options
    );
}

export function useTypographyTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useTypographyThemeSelectors(options);
}
