import {
    ref,
    selector,
    nsvariables,
    vref,
    DefinitionOptions,
    defaultDefinitionOptions
} from '@inkline/core';
import { useBorder, useFontSize, useSpacing, useTextColor } from '@inkline/theme';

const ns = 'blockquote';

export function useBlockquoteConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSize } = useFontSize(options);
    const { spacing } = useSpacing(options);
    const { borderLeftStyle, borderLeftColor } = useBorder(options);
    const { textColorWeak } = useTextColor(options);

    return {
        fontSize: ref(fontSize),
        margin: ref(spacing),
        padding: {
            top: ref(spacing),
            right: ref(spacing),
            bottom: ref(spacing),
            left: ref(spacing)
        },
        border: {
            left: {
                width: '4px',
                style: ref(borderLeftStyle),
                color: ref(borderLeftColor)
            },
            right: {
                width: '4px',
                style: ref(borderLeftStyle),
                color: ref(borderLeftColor)
            }
        },

        /**
         * @element cite
         */
        cite: {
            color: ref(textColorWeak),
            fontSize: '80%'
        }
    };
}

export function useBlockquoteVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useBlockquoteConfig(options), options);
}

export function useBlockquoteThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        blockquoteFontSize,
        blockquoteMargin,
        blockquotePaddingLeft,
        blockquotePaddingRight,
        blockquoteBorderLeftWidth,
        blockquoteBorderLeftStyle,
        blockquoteBorderLeftColor,
        blockquoteBorderRightWidth,
        blockquoteBorderRightStyle,
        blockquoteBorderRightColor,
        blockquoteCiteColor,
        blockquoteCiteFontSize
    } = useBlockquoteVariables(options);

    selector(
        '.blockquote',
        {
            margin: vref(blockquoteMargin),
            fontSize: ref(blockquoteFontSize)
        },
        options
    );

    selector(
        '.blockquote.-align-left',
        {
            textAlign: 'left'
        },
        options
    );

    selector(
        '.blockquote.-align-center',
        {
            textAlign: 'center'
        },
        options
    );

    selector(
        '.blockquote.-align-right',
        {
            textAlign: 'right'
        },
        options
    );

    selector(
        '.blockquote.-align-left.-border',
        {
            paddingLeft: ref(blockquotePaddingLeft),
            borderLeftWidth: ref(blockquoteBorderLeftWidth),
            borderLeftStyle: ref(blockquoteBorderLeftStyle),
            borderLeftColor: ref(blockquoteBorderLeftColor)
        },
        options
    );

    selector(
        '.blockquote.-align-right.-border',
        {
            paddingRight: ref(blockquotePaddingRight),
            borderRightWidth: ref(blockquoteBorderRightWidth),
            borderRightStyle: ref(blockquoteBorderRightStyle),
            borderRightColor: ref(blockquoteBorderRightColor)
        },
        options
    );

    selector(
        '.blockquote > p:last-child',
        {
            marginBottom: '0'
        },
        options
    );

    selector(
        '.blockquote cite',
        {
            color: vref(blockquoteCiteColor),
            fontSize: ref(blockquoteCiteFontSize),
            display: 'block'
        },
        options
    );

    selector(
        '.blockquote.-dash > cite::before',
        {
            content: '"\\2014 \\00A0"'
        },
        options
    );
}

export function useBlockquoteTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useBlockquoteVariables(options);
    useBlockquoteThemeSelectors(options);
}
