import {
    defaultDefinitionOptions,
    multiply,
    namespace,
    nsvariable,
    ref,
    selector,
    useMarginBase,
    usePaddingBase
} from '@inkline/config';

const ns = 'ul';

export function useUlVariables(options = defaultDefinitionOptions) {
    const { marginBottom } = useMarginBase();
    const { paddingLeft } = usePaddingBase();

    const ulMarginBottom = namespace(ns, marginBottom, options);
    const ulPaddingLeft = nsvariable(ns, 'padding-left', multiply(ref(paddingLeft), 2), options);

    return {
        ulMarginBottom,
        ulPaddingLeft
    };
}

export function useUlThemeBase() {
    const { ulMarginBottom, ulPaddingLeft } = useUlVariables();

    selector('ul', {
        marginBottom: ref(ulMarginBottom),
        paddingLeft: ref(ulPaddingLeft)
    });

    selector('ul ol, ul ul', {
        marginBottom: 0
    });
}

export function useUlTheme() {
    useUlVariables();
    useUlThemeBase();
}
