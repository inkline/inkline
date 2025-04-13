import { color, defaultDefinitionOptions, DefinitionOptions, ref } from '@inkline/core';
import { useNeutralColors } from './useColors';

export function useTextColorVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorGray900, colorGray700, colorGray500, colorGray300 } = useNeutralColors(options);

    const textColor = color('text-color', ref(colorGray900), options);
    const textColorWeak = color('text-color--weak', ref(colorGray700), options);
    const textColorWeaker = color('text-color--weaker', ref(colorGray500), options);
    const textColorWeakest = color('text-color--weakest', ref(colorGray300), options);

    const textColorMap = {
        default: textColor,
        weak: textColorWeak,
        weaker: textColorWeaker,
        weakest: textColorWeakest
    };

    return {
        textColor,
        textColorWeak,
        textColorWeaker,
        textColorWeakest,
        textColorMap
    };
}

export function useTextColor(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useTextColorVariables(options);
}
