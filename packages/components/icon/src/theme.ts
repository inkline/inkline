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
    nsvariable,
    nsdefine,
    defaultDefinitionOptions
} from '@inkline/core';

const ns = 'icon';

export function useIconThemeVariables(options = defaultDefinitionOptions) {
    const { fontSize } = useFontSize();

    return {
        ...nsdefine(
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

export function useIconThemeSizeFactory(size: ComponentSize) {
    const sizeNamespace = [ns, size] as const;
    const { iconFontSize } = useIconThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[size]);

    const variantFontSize = nsvariable(
        sizeNamespace,
        'font-size',
        multiply(ref(iconFontSize), sizeMultiplierRef)
    );

    selector(`.icon.-${size}`, {
        fontSize: ref(variantFontSize)
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
