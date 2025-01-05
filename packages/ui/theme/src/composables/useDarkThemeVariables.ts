import { darkThemeName, DefinitionOptions } from '@inkline/core';
import { ref, variable } from '@inkline/core';
import { useNeutralColors } from '../variables';

export function useDarkThemeVariables(userOptions: DefinitionOptions) {
    const options = {
        ...userOptions,
        theme: darkThemeName
    };

    const {
        colorGray100H, colorGray100S, colorGray100L, colorGray100A,
        colorGray300H, colorGray300S, colorGray300L, colorGray300A,
        colorGray500H, colorGray500S, colorGray500L, colorGray500A,
        colorGray700H, colorGray700S, colorGray700L, colorGray700A
    } = useNeutralColors(options);


    const borderTopColorH = variable('border-top-color-h', ref(colorGray700H), options);
    const borderTopColorS = variable('border-top-color-s', ref(colorGray700S), options);
    const borderTopColorL = variable('border-top-color-l', ref(colorGray700L), options);
    const borderTopColorA = variable('border-top-color-a', ref(colorGray700A), options);

    const borderRightColorH = variable('border-right-color-h', ref(colorGray700H), options);
    const borderRightColorS = variable('border-right-color-s', ref(colorGray700S), options);
    const borderRightColorL = variable('border-right-color-l', ref(colorGray700L), options);
    const borderRightColorA = variable('border-right-color-a', ref(colorGray700A), options);

    const borderBottomColorH = variable('border-bottom-color-h', ref(colorGray700H), options);
    const borderBottomColorS = variable('border-bottom-color-s', ref(colorGray700S), options);
    const borderBottomColorL = variable('border-bottom-color-l', ref(colorGray700L), options);
    const borderBottomColorA = variable('border-bottom-color-a', ref(colorGray700A), options);

    const borderLeftColorH = variable('border-left-color-h', ref(colorGray700H), options);
    const borderLeftColorS = variable('border-left-color-s', ref(colorGray700S), options);
    const borderLeftColorL = variable('border-left-color-l', ref(colorGray700L), options);
    const borderLeftColorA = variable('border-left-color-a', ref(colorGray700A), options);

    const textColorH = variable('text-color-h', ref(colorGray100H), options);
    const textColorS = variable('text-color-s', ref(colorGray100S), options);
    const textColorL = variable('text-color-l', ref(colorGray100L), options);
    const textColorA = variable('text-color-a', ref(colorGray100A), options);

    const textColorWeakH = variable('text-color-weak-h', ref(colorGray300H), options);
    const textColorWeakS = variable('text-color-weak-s', ref(colorGray300S), options);
    const textColorWeakL = variable('text-color-weak-l', ref(colorGray300L), options);
    const textColorWeakA = variable('text-color-weak-a', ref(colorGray300A), options);

    const textColorWeakerH = variable('text-color-weaker-h', ref(colorGray500H), options);
    const textColorWeakerS = variable('text-color-weaker-s', ref(colorGray500S), options);
    const textColorWeakerL = variable('text-color-weaker-l', ref(colorGray500L), options);
    const textColorWeakerA = variable('text-color-weaker-a', ref(colorGray500A), options);

    const textColorWeakestH = variable('text-color-weakest-h', ref(colorGray700H), options);
    const textColorWeakestS = variable('text-color-weakest-s', ref(colorGray700S), options);
    const textColorWeakestL = variable('text-color-weakest-l', ref(colorGray700L), options);
    const textColorWeakestA = variable('text-color-weakest-a', ref(colorGray700A), options);

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
