import { ref, variable } from '../tokens';
import { defaultDefinitionOptions } from '../constants';
import { useNeutralColors } from './useColors';

export function useContrastTextColor(options = defaultDefinitionOptions) {
    const { colorWhite, colorGray900 } = useNeutralColors();

    const contrastTextColorLight = variable(
        'contrast-text-color-light',
        ref(colorGray900),
        options
    );
    const contrastTextColorDark = variable('contrast-text-color-dark', ref(colorWhite), options);

    return {
        contrastTextColorLight,
        contrastTextColorDark
    };
}
