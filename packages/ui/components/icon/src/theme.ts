import {
    ComponentSize,
    useFontSize,
    useKeyMappedSizeMultiplier,
    defaultComponentSizes
} from '@inkline/theme';
import {
    multiply,
    ref,
    selector,
    nsvariables,
    defaultDefinitionOptions,
    stripExportsNamespace
} from '@inkline/core';

const ns = 'icon';

export function useIconThemeVariables(options = defaultDefinitionOptions) {
    const { fontSize } = useFontSize();

    return {
        ...nsvariables(
            ns,
            {
                fontSize: ref(fontSize)
            },
            options
        )
    };
}
export function useIconThemeBase() {
    const { iconFontSize } = useIconThemeVariables();

    selector('.icon', {
        fontSize: ref(iconFontSize)
    });
}

export function useIconThemeSizeFactory(variant: ComponentSize) {
    const { iconFontSize } = useIconThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[variant]);
    const sizeNs = [ns, variant] as const;

    const { fontSize } = stripExportsNamespace(
        nsvariables(sizeNs, {
            fontSize: multiply(ref(iconFontSize), sizeMultiplierRef)
        })
    );

    selector(`.icon.-${variant}`, {
        fontSize: ref(fontSize)
    });
}

export function useIconThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(useIconThemeSizeFactory);
}

export function useIconTheme() {
    useIconThemeVariables();
    useIconThemeBase();
    useIconThemeSizes();
}
