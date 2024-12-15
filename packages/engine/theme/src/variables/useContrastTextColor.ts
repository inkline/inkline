import { ref, variable } from '@inkline/core';
import { defaultDefinitionOptions } from '@inkline/core';
import { useNeutralColors } from './useColors';

export function useContrastTextColor(options = defaultDefinitionOptions) {
    const { colorWhite, colorGray900 } = useNeutralColors();

    const contrastTextColorLight = variable(
        'contrast-text-color-light',
        ref(colorGray900),
        options
    );
    const contrastTextColorDark = variable('contrast-text-color-dark', ref(colorWhite), options);

    const contrastTextColorPrimary = variable(
        'contrast-text-color-primary',
        ref(contrastTextColorDark),
        options
    );
    const contrastTextColorSecondary = variable(
        'contrast-text-color-secondary',
        ref(contrastTextColorDark),
        options
    );
    const contrastTextColorInfo = variable(
        'contrast-text-color-info',
        ref(contrastTextColorLight),
        options
    );
    const contrastTextColorSuccess = variable(
        'contrast-text-color-success',
        ref(contrastTextColorLight),
        options
    );
    const contrastTextColorWarning = variable(
        'contrast-text-color-warning',
        ref(contrastTextColorLight),
        options
    );
    const contrastTextColorDanger = variable(
        'contrast-text-color-danger',
        ref(contrastTextColorDark),
        options
    );

    return {
        contrastTextColorLight,
        contrastTextColorDark,
        contrastTextColorPrimary,
        contrastTextColorSecondary,
        contrastTextColorInfo,
        contrastTextColorSuccess,
        contrastTextColorWarning,
        contrastTextColorDanger
    };
}
