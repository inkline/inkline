import { color, defaultDefinitionOptions, DefinitionOptions, ref } from '@inkline/core';
import { useNeutralColors } from './useColors';

export function useContrastTextColorVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        colorWhite,
        colorGray900
    } = useNeutralColors(options);

    const contrastTextColorLight = color(
        'contrast-text-color-light',
        ref(colorGray900),
        options
    );

    const contrastTextColorDark = color('contrast-text-color-dark', ref(colorWhite), options);

    const contrastTextColorPrimary = color(
        'contrast-text-color-primary',

        ref(contrastTextColorDark),
        options
    );

    const contrastTextColorSecondary = color(
        'contrast-text-color-secondary',
        ref(contrastTextColorDark),
        options
    );

    const contrastTextColorInfo = color(
        'contrast-text-color-info',
        ref(contrastTextColorLight),
        options
    );

    const contrastTextColorSuccess = color(
        'contrast-text-color-success',
        ref(contrastTextColorLight),
        options
    );

    const contrastTextColorWarning = color(
        'contrast-text-color-warning',
        ref(contrastTextColorLight),
        options
    );

    const contrastTextColorDanger = color(
        'contrast-text-color-danger',
        ref(contrastTextColorLight),
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

export function useContrastTextColor(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useContrastTextColorVariables(options);
}
