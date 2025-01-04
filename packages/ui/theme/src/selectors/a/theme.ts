import { defaultDefinitionOptions, nsvariables, ref, selector, vref } from '@inkline/core';
import { useBrandColorVariants } from '../../variables';

const ns = 'a';

export function useAThemeConfig() {
    const {
        colorPrimary500H,
        colorPrimary500S,
        colorPrimary500L,
        colorPrimary500A,
        colorPrimary600H,
        colorPrimary600S,
        colorPrimary600L,
        colorPrimary600A
    } = useBrandColorVariants();

    return {
        color: {
            h: ref(colorPrimary500H),
            s: ref(colorPrimary500S),
            l: ref(colorPrimary500L),
            a: ref(colorPrimary500A)
        },
        textDecoration: 'none',
        /**
         * @state hover
         */
        hover: {
            color: {
                h: ref(colorPrimary600H),
                s: ref(colorPrimary600S),
                l: ref(colorPrimary600L),
                a: ref(colorPrimary600A)
            },
            textDecoration: 'underline'
        }
    };
}

export function useAThemeVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useAThemeConfig(), options);
}

export function useAThemeSelectors() {
    const { aColor, aTextDecoration, aHoverColor, aHoverTextDecoration } = useAThemeVariables();

    selector('a', {
        color: vref(aColor),
        textDecoration: ref(aTextDecoration)
    });

    selector('a:hover', {
        color: vref(aHoverColor),
        textDecoration: ref(aHoverTextDecoration)
    });

    // Undo these styles for placeholder links/named anchors (without href).
    // It would be more straightforward to just use a[href] in previous block, but that
    // causes specificity issues in many other styles that are too complex to fix.
    selector('a:not([href], [class], [to]), a:not([href], [class], [to]):hover', {
        color: 'inherit',
        textDecoration: 'none'
    });
}

export function useATheme() {
    useAThemeVariables();
    useAThemeSelectors();
}
