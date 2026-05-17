import { defaultDefinitionOptions, darkThemeName, DefinitionOptions } from '@inkline/core';
import { ref, variable } from '@inkline/core';
import { useNeutralColors } from '../variables';

export function useDarkThemeVariables(userOptions: DefinitionOptions) {
    const options = {
        ...defaultDefinitionOptions,
        ...userOptions,
        theme: darkThemeName
    };

    const {
        colorGray100,
        colorGray300,
        colorGray500,
        colorGray700
    } = useNeutralColors(options);


    const borderTopColor = variable('border-top-color', ref(colorGray700), options);
    const borderRightColor = variable('border-right-color', ref(colorGray700), options);
    const borderBottomColor = variable('border-bottom-color', ref(colorGray700), options);
    const borderLeftColor = variable('border-left-color', ref(colorGray700), options);

    const textColor = variable('text-color', ref(colorGray100), options);
    const textColorWeak = variable('text-color--weak', ref(colorGray300), options);
    const textColorWeaker = variable('text-color--weaker', ref(colorGray500), options);
    const textColorWeakest = variable('text-color--weakest', ref(colorGray700), options);

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
