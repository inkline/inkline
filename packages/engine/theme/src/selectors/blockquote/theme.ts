import { defaultDefinitionOptions, addVariableNamespace, nsvariable, ref, selector } from '@inkline/core';
import {
    useBorder,
    useFontSize,
    useMarginBase,
    usePaddingBase,
    useTextColor
} from '../../variables';

const ns = 'blockquote';

export function useBlockquoteVariables(options = defaultDefinitionOptions) {
    const { fontSize } = useFontSize();
    const { marginBottom } = useMarginBase();
    const { paddingLeft } = usePaddingBase();
    const { borderLeftWidth, borderLeftStyle, borderLeftColor } = useBorder();
    const { textColorWeak } = useTextColor();

    const blockquoteFontSize = addVariableNamespace(ns, fontSize, options);

    const blockquoteMarginBottom = addVariableNamespace(ns, marginBottom, options);

    const blockquoteBorderedPadding = nsvariable(
        [ns, 'bordered'],
        'padding',
        ref(paddingLeft),
        options
    );

    const blockquoteBorderedBorderWidth = nsvariable(
        [ns, 'bordered'],
        'border-width',
        ref(borderLeftWidth),
        options
    );
    const blockquoteBorderedBorderStyle = nsvariable(
        [ns, 'bordered'],
        'border-style',
        ref(borderLeftStyle),
        options
    );
    const blockquoteBorderedBorderColor = nsvariable(
        [ns, 'bordered'],
        'border-color',
        ref(borderLeftColor),
        options
    );

    const blockquoteFooterColor = nsvariable([ns, 'footer'], 'color', ref(textColorWeak), options);
    const blockquoteFooterFontSize = nsvariable([ns, 'footer'], 'font-size', '80%', options);

    return {
        blockquoteFontSize,
        blockquoteMarginBottom,
        blockquoteBorderedPadding,
        blockquoteBorderedBorderWidth,
        blockquoteBorderedBorderStyle,
        blockquoteBorderedBorderColor,
        blockquoteFooterColor,
        blockquoteFooterFontSize
    };
}

export function useBlockquoteThemeBase() {
    const {
        blockquoteFontSize,
        blockquoteMarginBottom,
        blockquoteBorderedPadding,
        blockquoteBorderedBorderWidth,
        blockquoteBorderedBorderStyle,
        blockquoteBorderedBorderColor,
        blockquoteFooterColor,
        blockquoteFooterFontSize
    } = useBlockquoteVariables();

    selector('.blockquote', {
        marginBottom: ref(blockquoteMarginBottom),
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
        paddingLeft: ref(blockquoteBorderedPadding),
        borderLeftWidth: ref(blockquoteBorderedBorderWidth),
        borderLeftStyle: ref(blockquoteBorderedBorderStyle),
        borderLeftColor: ref(blockquoteBorderedBorderColor)
    });

    selector('.blockquote.-right.-bordered', {
        paddingRight: ref(blockquoteBorderedPadding),
        borderRightWidth: ref(blockquoteBorderedBorderWidth),
        borderRightStyle: ref(blockquoteBorderedBorderStyle),
        borderRightColor: ref(blockquoteBorderedBorderColor)
    });

    selector('.blockquote > p:last-child', {
        marginBottom: '0'
    });

    selector('.blockquote > footer, blockquote > .footer', {
        color: ref(blockquoteFooterColor),
        fontSize: ref(blockquoteFooterFontSize),
        display: 'block'
    });

    selector('.blockquote > footer::before, blockquote > .footer::before', {
        content: '"\\2014 \\00A0"'
    });
}

export function useBlockquoteTheme() {
    useBlockquoteVariables();
    useBlockquoteThemeBase();
}
