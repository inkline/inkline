import {
    ref,
    selector,
    nsvariables,
    vref, DefinitionOptions, defaultDefinitionOptions
} from '@inkline/core';
import {
    useBorder,
    useFontSize,
    useSpacing,
    useTextColor
} from '../../../variables';

const ns = 'blockquote';

export function useBlockquoteVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSize } = useFontSize(options);
    const { spacing } = useSpacing(options);
    const { borderLeftWidth, borderLeftStyle, borderLeftColor } = useBorder(options);
    const { textColorWeak } = useTextColor(options);

    return nsvariables(ns, {
        fontSize: ref(fontSize),
        margin: ref(spacing),

        /**
         * @variant bordered
         */
        bordered: {
            padding: ref(spacing),
            border: {
                left: {
                    width: ref(borderLeftWidth),
                    style: ref(borderLeftStyle),
                    color: ref(borderLeftColor)
                }
            }
        },

        /**
         * @element footer
         */
        footer: {
            color: ref(textColorWeak),
            fontSize: '80%'
        }
    }, options);
}

export function useBlockquoteThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        blockquoteFontSize,
        blockquoteMargin,
        blockquoteBorderedPaddingLeft,
        blockquoteBorderedPaddingRight,
        blockquoteBorderedBorderLeftWidth,
        blockquoteBorderedBorderLeftStyle,
        blockquoteBorderedBorderLeftColor,
        blockquoteBorderedBorderRightWidth,
        blockquoteBorderedBorderRightStyle,
        blockquoteBorderedBorderRightColor,
        blockquoteFooterColor,
        blockquoteFooterFontSize
    } = useBlockquoteVariables(options);

    selector('.blockquote', {
        margin: vref(blockquoteMargin),
        fontSize: ref(blockquoteFontSize)
    }, options);

    selector('.blockquote.-left', {
        textAlign: 'left'
    }, options);

    selector('.blockquote.-center', {
        textAlign: 'center'
    }, options);

    selector('.blockquote.-right', {
        textAlign: 'right'
    }, options);

    selector('.blockquote.-left.-bordered', {
        paddingLeft: ref(blockquoteBorderedPaddingLeft),
        borderLeftWidth: ref(blockquoteBorderedBorderLeftWidth),
        borderLeftStyle: ref(blockquoteBorderedBorderLeftStyle),
        borderLeftColor: ref(blockquoteBorderedBorderLeftColor)
    }, options);

    selector('.blockquote.-right.-bordered', {
        paddingRight: ref(blockquoteBorderedPaddingRight),
        borderRightWidth: ref(blockquoteBorderedBorderRightWidth),
        borderRightStyle: ref(blockquoteBorderedBorderRightStyle),
        borderRightColor: ref(blockquoteBorderedBorderRightColor)
    }, options);

    selector('.blockquote > p:last-child', {
        marginBottom: '0'
    }, options);

    selector('.blockquote > footer, blockquote > .footer', {
        color: vref(blockquoteFooterColor),
        fontSize: ref(blockquoteFooterFontSize),
        display: 'block'
    }, options);

    selector('.blockquote > footer::before, blockquote > .footer::before', {
        content: '"\\2014 \\00A0"'
    }, options);
}

export function useBlockquoteTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useBlockquoteVariables(options);
    useBlockquoteThemeSelectors(options);
}
