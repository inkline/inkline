import { DefinitionOptions, defaultDefinitionOptions, nsvariables, ref, selector, vref } from '@inkline/core';
import { useBrandColorVariants } from '../../variables';

const ns = 'a';

export function useAThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        colorPrimary500,
        colorPrimary600
    } = useBrandColorVariants(options);

    return {
        color: ref(colorPrimary500),
        textDecoration: 'none',
        /**
         * @state hover
         */
        hover: {
            color: ref(colorPrimary600),
            textDecoration: 'underline'
        }
    };
}

export function useAThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useAThemeConfig(options), options);
}

export function useAThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { aColor, aTextDecoration, aHoverColor, aHoverTextDecoration } = useAThemeVariables(options);

    selector('a', {
        color: vref(aColor),
        textDecoration: ref(aTextDecoration)
    }, options);

    selector('a:hover', {
        color: vref(aHoverColor),
        textDecoration: ref(aHoverTextDecoration)
    }, options);

    // Undo these styles for placeholder links/named anchors (without href).
    // It would be more straightforward to just use a[href] in previous block, but that
    // causes specificity issues in many other styles that are too complex to fix.
    selector('a:not([href], [class], [to]), a:not([href], [class], [to]):hover', {
        color: 'inherit',
        textDecoration: 'none'
    }, options);
}

export function useATheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useAThemeVariables(options);
    useAThemeSelectors(options);
}
