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

export function useIconThemeVariables(options: DefinitionOptions) {
    const { fontSize } = useFontSize(options);

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

export function useIconThemeBase(options: DefinitionOptions) {
    const { iconFontSize } = useIconThemeVariables(options);

    selector('.icon', {
        fontSize: ref(iconFontSize)
    });
}

export function useIconThemeSizeFactory(variant: ComponentSize) {
    const { iconFontSize } = useIconThemeVariables(options);
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier(options);
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

export function useIconThemeSizes(sizes = defaultComponentSizes) {
    sizes.forEach((size) => useIconThemeSizeFactory(size, options));
}

export function useIconTheme(options: DefinitionOptions) {
    useIconThemeVariables(options);
    useIconThemeBase(options);
    useIconThemeSizes(options);
}
