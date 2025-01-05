import {
    ref,
    selector,
    nsvariables,
    vref, DefinitionOptions
} from '@inkline/core';
import {
    useBorder,
    useFontSize,
    useSpacing,
    useTextColor
} from '../../variables';

const ns = 'blockquote';

export function useBlockquoteVariables(options: DefinitionOptions) {
    const { fontSize } = useFontSize(options);
    const { spacing } = useSpacing(options);
    const { borderLeftWidth, borderLeftStyle, borderLeftColor } = useBorder(options);
    const {
        textColorWeakH,
        textColorWeakS,
        textColorWeakL,
        textColorWeakA
    } = useTextColor(options);

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
            color: {
                h: ref(textColorWeakH),
                s: ref(textColorWeakS),
                l: ref(textColorWeakL),
                a: ref(textColorWeakA)
            },
            fontSize: '80%'
        }
    }, options);
}

export function useBlockquoteThemeSelectors(options: DefinitionOptions) {
    const {
        blockquoteFontSize,
        blockquoteMargin,
        blockquoteBorderedPaddingLeft,
        blockquoteBorderedPaddingRight,
        blockquoteBorderedBorderWidth,
        blockquoteBorderedBorderStyle,
        blockquoteBorderedBorderColor,
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
        paddingLeft: vref(blockquoteBorderedPaddingLeft),
        borderLeftWidth: vref(blockquoteBorderedBorderWidth),
        borderLeftStyle: vref(blockquoteBorderedBorderStyle),
        borderLeftColor: vref(blockquoteBorderedBorderColor)
    }, options);

    selector('.blockquote.-right.-bordered', {
        paddingRight: ref(blockquoteBorderedPaddingRight),
        borderRightWidth: ref(blockquoteBorderedBorderWidth),
        borderRightStyle: ref(blockquoteBorderedBorderStyle),
        borderRightColor: ref(blockquoteBorderedBorderColor)
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

export function useBlockquoteTheme(options: DefinitionOptions) {
    useBlockquoteVariables(options);
    useBlockquoteThemeSelectors(options);
}
