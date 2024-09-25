import { ref, variable } from '../tokens';
import { useNeutralColors } from './useColors';
import { defaultDefinitionOptions } from '../constants';

export function useTextColor(options = defaultDefinitionOptions) {
    const { colorGray900, colorGray700, colorGray500, colorGray300 } = useNeutralColors();

    const textColor = variable('text-color', ref(colorGray900), options);
    const textColorWeak = variable('text-color-weak', ref(colorGray700), options);
    const textColorWeaker = variable('text-color-weaker', ref(colorGray500), options);
    const textColorWeakest = variable('text-color-weakest', ref(colorGray300), options);

    return {
        textColor,
        textColorWeak,
        textColorWeaker,
        textColorWeakest
    };
}
