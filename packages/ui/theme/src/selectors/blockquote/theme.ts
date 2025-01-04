import {
    defaultDefinitionOptions,
    ref,
    selector,
    nsvariables,
    vref
} from '@inkline/core';
import {
    useBorder,
    useFontSize,
    useSpacing,
    useTextColor
} from '../../variables';

const ns = 'blockquote';

export function useBlockquoteVariables(options = defaultDefinitionOptions) {
    const { fontSize } = useFontSize();
    const { spacing } = useSpacing();
    const { borderLeftWidth, borderLeftStyle, borderLeftColor } = useBorder();
    const {
        textColorWeakH,
        textColorWeakS,
        textColorWeakL,
        textColorWeakA
    } = useTextColor();

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

export function useBlockquoteThemeSelectors() {
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
    } = useBlockquoteVariables();

    selector('.blockquote', {
        margin: vref(blockquoteMargin),
        fontSize: ref(blockquoteFontSize)
    });

    selector('.blockquote.-left', {
        textAlign: 'left'
    });

    selector('.blockquote.-center', {
        textAlign: 'center'
    });

    selector('.blockquote.-right', {
        textAlign: 'right'
    });

    selector('.blockquote.-left.-bordered', {
        paddingLeft: vref(blockquoteBorderedPaddingLeft),
        borderLeftWidth: vref(blockquoteBorderedBorderWidth),
        borderLeftStyle: vref(blockquoteBorderedBorderStyle),
        borderLeftColor: vref(blockquoteBorderedBorderColor)
    });

    selector('.blockquote.-right.-bordered', {
        paddingRight: ref(blockquoteBorderedPaddingRight),
        borderRightWidth: ref(blockquoteBorderedBorderWidth),
        borderRightStyle: ref(blockquoteBorderedBorderStyle),
        borderRightColor: ref(blockquoteBorderedBorderColor)
    });

    selector('.blockquote > p:last-child', {
        marginBottom: '0'
    });

    selector('.blockquote > footer, blockquote > .footer', {
        color: vref(blockquoteFooterColor),
        fontSize: ref(blockquoteFooterFontSize),
        display: 'block'
    });

    selector('.blockquote > footer::before, blockquote > .footer::before', {
        content: '"\\2014 \\00A0"'
    });
}

export function useBlockquoteTheme() {
    useBlockquoteVariables();
    useBlockquoteThemeSelectors();
}
