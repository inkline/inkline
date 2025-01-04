import { darkThemeName, defaultDefinitionOptions } from '@inkline/core';
import { ref, variable } from '@inkline/core';
import { useNeutralColors } from '../variables';

export function useDarkThemeVariables(options = defaultDefinitionOptions) {
    const {
        colorGray100H, colorGray100S, colorGray100L, colorGray100A,
        colorGray300H, colorGray300S, colorGray300L, colorGray300A,
        colorGray500H, colorGray500S, colorGray500L, colorGray500A,
        colorGray700H, colorGray700S, colorGray700L, colorGray700A
    } = useNeutralColors();

    const themeOptions = {
        ...options,
        theme: darkThemeName
    };

    const borderTopColorH = variable('border-top-color-h', ref(colorGray700H), themeOptions);
    const borderTopColorS = variable('border-top-color-s', ref(colorGray700S), themeOptions);
    const borderTopColorL = variable('border-top-color-l', ref(colorGray700L), themeOptions);
    const borderTopColorA = variable('border-top-color-a', ref(colorGray700A), themeOptions);

    const borderRightColorH = variable('border-right-color-h', ref(colorGray700H), themeOptions);
    const borderRightColorS = variable('border-right-color-s', ref(colorGray700S), themeOptions);
    const borderRightColorL = variable('border-right-color-l', ref(colorGray700L), themeOptions);
    const borderRightColorA = variable('border-right-color-a', ref(colorGray700A), themeOptions);

    const borderBottomColorH = variable('border-bottom-color-h', ref(colorGray700H), themeOptions);
    const borderBottomColorS = variable('border-bottom-color-s', ref(colorGray700S), themeOptions);
    const borderBottomColorL = variable('border-bottom-color-l', ref(colorGray700L), themeOptions);
    const borderBottomColorA = variable('border-bottom-color-a', ref(colorGray700A), themeOptions);

    const borderLeftColorH = variable('border-left-color-h', ref(colorGray700H), themeOptions);
    const borderLeftColorS = variable('border-left-color-s', ref(colorGray700S), themeOptions);
    const borderLeftColorL = variable('border-left-color-l', ref(colorGray700L), themeOptions);
    const borderLeftColorA = variable('border-left-color-a', ref(colorGray700A), themeOptions);

    const textColorH = variable('text-color-h', ref(colorGray100H), themeOptions);
    const textColorS = variable('text-color-s', ref(colorGray100S), themeOptions);
    const textColorL = variable('text-color-l', ref(colorGray100L), themeOptions);
    const textColorA = variable('text-color-a', ref(colorGray100A), themeOptions);

    const textColorWeakH = variable('text-color-weak-h', ref(colorGray300H), themeOptions);
    const textColorWeakS = variable('text-color-weak-s', ref(colorGray300S), themeOptions);
    const textColorWeakL = variable('text-color-weak-l', ref(colorGray300L), themeOptions);
    const textColorWeakA = variable('text-color-weak-a', ref(colorGray300A), themeOptions);

    const textColorWeakerH = variable('text-color-weaker-h', ref(colorGray500H), themeOptions);
    const textColorWeakerS = variable('text-color-weaker-s', ref(colorGray500S), themeOptions);
    const textColorWeakerL = variable('text-color-weaker-l', ref(colorGray500L), themeOptions);
    const textColorWeakerA = variable('text-color-weaker-a', ref(colorGray500A), themeOptions);

    const textColorWeakestH = variable('text-color-weakest-h', ref(colorGray700H), themeOptions);
    const textColorWeakestS = variable('text-color-weakest-s', ref(colorGray700S), themeOptions);
    const textColorWeakestL = variable('text-color-weakest-l', ref(colorGray700L), themeOptions);
    const textColorWeakestA = variable('text-color-weakest-a', ref(colorGray700A), themeOptions);

    return {
        borderTopColorH,
        borderTopColorS,
        borderTopColorL,
        borderTopColorA,
        borderRightColorH,
        borderRightColorS,
        borderRightColorL,
        borderRightColorA,
        borderBottomColorH,
        borderBottomColorS,
        borderBottomColorL,
        borderBottomColorA,
        borderLeftColorH,
        borderLeftColorS,
        borderLeftColorL,
        borderLeftColorA,
        textColorH,
        textColorS,
        textColorL,
        textColorA,
        textColorWeakH,
        textColorWeakS,
        textColorWeakL,
        textColorWeakA,
        textColorWeakerH,
        textColorWeakerS,
        textColorWeakerL,
        textColorWeakerA,
        textColorWeakestH,
        textColorWeakestS,
        textColorWeakestL,
        textColorWeakestA
    };
}
