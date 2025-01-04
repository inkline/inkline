import { color, ref } from '@inkline/core';
import { useNeutralColors } from './useColors';
import { defaultDefinitionOptions } from '@inkline/core';

export function useTextColor(options = defaultDefinitionOptions) {
    const {
        colorGray900H,
        colorGray900S,
        colorGray900L,
        colorGray900A,
        colorGray700H,
        colorGray700S,
        colorGray700L,
        colorGray700A,
        colorGray500H,
        colorGray500S,
        colorGray500L,
        colorGray500A,
        colorGray300H,
        colorGray300S,
        colorGray300L,
        colorGray300A
    } = useNeutralColors();

    const {
        textColor,
        textColorH,
        textColorS,
        textColorL,
        textColorA
    } = color('text-color', [ref(colorGray900H), ref(colorGray900S), ref(colorGray900L), ref(colorGray900A)], options);
    const {
        textColorWeak,
        textColorWeakH,
        textColorWeakS,
        textColorWeakL,
        textColorWeakA
    } = color('text-color-weak', [
        ref(colorGray700H),
        ref(colorGray700S),
        ref(colorGray700L),
        ref(colorGray700A)
    ], options);
    const {
        textColorWeaker,
        textColorWeakerH,
        textColorWeakerS,
        textColorWeakerL,
        textColorWeakerA
    } = color('text-color-weaker', [
        ref(colorGray500H),
        ref(colorGray500S),
        ref(colorGray500L),
        ref(colorGray500A)
    ], options);
    const {
        textColorWeakest,
        textColorWeakestH,
        textColorWeakestS,
        textColorWeakestL,
        textColorWeakestA
    } = color('text-color-weakest', [
        ref(colorGray300H),
        ref(colorGray300S),
        ref(colorGray300L),
        ref(colorGray300A)
    ], options);

    return {
        textColor,
        textColorH,
        textColorS,
        textColorL,
        textColorA,
        textColorWeak,
        textColorWeakH,
        textColorWeakS,
        textColorWeakL,
        textColorWeakA,
        textColorWeaker,
        textColorWeakerH,
        textColorWeakerS,
        textColorWeakerL,
        textColorWeakerA,
        textColorWeakest,
        textColorWeakestH,
        textColorWeakestS,
        textColorWeakestL,
        textColorWeakestA
    };
}
