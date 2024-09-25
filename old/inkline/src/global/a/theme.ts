import {
    defaultDefinitionOptions,
    nsvariable,
    ref,
    selector,
    useBrandColorVariants
} from '@inkline/config';

const ns = 'a';

export function useAThemeVariables(options = defaultDefinitionOptions) {
    const { colorPrimary500, colorPrimary600 } = useBrandColorVariants();

    const aColor = nsvariable(ns, 'color', ref(colorPrimary500), options);
    const aTextDecoration = nsvariable(ns, 'text-decoration', 'none', options);

    const aHoverColor = nsvariable([ns, 'hover'], 'color', ref(colorPrimary600), options);
    const aHoverTextDecoration = nsvariable([ns, 'hover'], 'text-decoration', 'underline', options);

    return {
        aColor,
        aTextDecoration,
        aHoverColor,
        aHoverTextDecoration
    };
}

export function useAThemeBase() {
    const { aColor, aTextDecoration, aHoverColor, aHoverTextDecoration } = useAThemeVariables();

    selector('a', {
        color: ref(aColor),
        textDecoration: ref(aTextDecoration)
    });

    selector('a:hover', {
        color: ref(aHoverColor),
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
    useAThemeBase();
}
