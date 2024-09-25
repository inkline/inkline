import { darkThemeName, defaultDefinitionOptions } from '@inkline/core';
import { ref, variable } from '@inkline/core';
import { useNeutralColors } from './useColors';

export function useDarkTheme(options = defaultDefinitionOptions) {
    const { colorGray100, colorGray300, colorGray500, colorGray700 } = useNeutralColors();

    const themeOptions = {
        ...options,
        theme: darkThemeName
    };

    const borderTopColor = variable('border-top-color', ref(colorGray700), themeOptions);
    const borderRightColor = variable('border-right-color', ref(colorGray700), themeOptions);
    const borderBottomColor = variable('border-bottom-color', ref(colorGray700), themeOptions);
    const borderLeftColor = variable('border-left-color', ref(colorGray700), themeOptions);

    const textColor = variable('text-color', ref(colorGray100), themeOptions);
    const textColorWeak = variable('text-color-weak', ref(colorGray300), themeOptions);
    const textColorWeaker = variable('text-color-weaker', ref(colorGray500), themeOptions);
    const textColorWeakest = variable('text-color-weakest', ref(colorGray700), themeOptions);

    return {
        borderTopColor,
        borderRightColor,
        borderBottomColor,
        borderLeftColor,
        textColor,
        textColorWeak,
        textColorWeaker,
        textColorWeakest
    };
}
