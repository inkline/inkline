import { color, ref } from '@inkline/core';
import { defaultDefinitionOptions } from '@inkline/core';
import { useNeutralColors } from './useColors';

export function useContrastTextColor(options = defaultDefinitionOptions) {
    const {
        colorWhiteH,
        colorWhiteS,
        colorWhiteL,
        colorWhiteA,
        colorGray900H,
        colorGray900S,
        colorGray900L,
        colorGray900A
    } = useNeutralColors();

    const {
        contrastTextColorLight,
        contrastTextColorLightH,
        contrastTextColorLightS,
        contrastTextColorLightL,
        contrastTextColorLightA
    } = color(
        'contrast-text-color-light',
        [
            ref(colorGray900H),
            ref(colorGray900S),
            ref(colorGray900L),
            ref(colorGray900A)
        ],
        options
    );

    const {
        contrastTextColorDark,
        contrastTextColorDarkH,
        contrastTextColorDarkS,
        contrastTextColorDarkL,
        contrastTextColorDarkA
    } = color('contrast-text-color-dark', [
        ref(colorWhiteH),
        ref(colorWhiteS),
        ref(colorWhiteL),
        ref(colorWhiteA)
    ], options);

    const {
        contrastTextColorPrimary,
        contrastTextColorPrimaryH,
        contrastTextColorPrimaryS,
        contrastTextColorPrimaryL,
        contrastTextColorPrimaryA
    } = color(
        'contrast-text-color-primary',
        [
            ref(contrastTextColorDarkH),
            ref(contrastTextColorDarkS),
            ref(contrastTextColorDarkL),
            ref(contrastTextColorDarkA)
        ],
        options
    );

    const {
        contrastTextColorSecondary,
        contrastTextColorSecondaryH,
        contrastTextColorSecondaryS,
        contrastTextColorSecondaryL,
        contrastTextColorSecondaryA
    } = color(
        'contrast-text-color-secondary',
        [
            ref(contrastTextColorDarkH),
            ref(contrastTextColorDarkS),
            ref(contrastTextColorDarkL),
            ref(contrastTextColorDarkA)
        ],
        options
    );

    const {
        contrastTextColorInfo,
        contrastTextColorInfoH,
        contrastTextColorInfoS,
        contrastTextColorInfoL,
        contrastTextColorInfoA
    } = color(
        'contrast-text-color-info',
        [
            ref(contrastTextColorLightH),
            ref(contrastTextColorLightS),
            ref(contrastTextColorLightL),
            ref(contrastTextColorLightA)
        ],
        options
    );

    const {
        contrastTextColorSuccess,
        contrastTextColorSuccessH,
        contrastTextColorSuccessS,
        contrastTextColorSuccessL,
        contrastTextColorSuccessA
    } = color(
        'contrast-text-color-success',
        [
            ref(contrastTextColorLightH),
            ref(contrastTextColorLightS),
            ref(contrastTextColorLightL),
            ref(contrastTextColorLightA)
        ],
        options
    );

    const {
        contrastTextColorWarning,
        contrastTextColorWarningH,
        contrastTextColorWarningS,
        contrastTextColorWarningL,
        contrastTextColorWarningA
    } = color(
        'contrast-text-color-warning',
        [
            ref(contrastTextColorLightH),
            ref(contrastTextColorLightS),
            ref(contrastTextColorLightL),
            ref(contrastTextColorLightA)
        ],
        options
    );

    const {
        contrastTextColorDanger,
        contrastTextColorDangerH,
        contrastTextColorDangerS,
        contrastTextColorDangerL,
        contrastTextColorDangerA
    } = color(
        'contrast-text-color-danger',
        [
            ref(contrastTextColorLightH),
            ref(contrastTextColorLightS),
            ref(contrastTextColorLightL),
            ref(contrastTextColorLightA)
        ],
        options
    );

    return {
        contrastTextColorLight,
        contrastTextColorLightH,
        contrastTextColorLightS,
        contrastTextColorLightL,
        contrastTextColorLightA,
        contrastTextColorDark,
        contrastTextColorDarkH,
        contrastTextColorDarkS,
        contrastTextColorDarkL,
        contrastTextColorDarkA,
        contrastTextColorPrimary,
        contrastTextColorPrimaryH,
        contrastTextColorPrimaryS,
        contrastTextColorPrimaryL,
        contrastTextColorPrimaryA,
        contrastTextColorSecondary,
        contrastTextColorSecondaryH,
        contrastTextColorSecondaryS,
        contrastTextColorSecondaryL,
        contrastTextColorSecondaryA,
        contrastTextColorInfo,
        contrastTextColorInfoH,
        contrastTextColorInfoS,
        contrastTextColorInfoL,
        contrastTextColorInfoA,
        contrastTextColorSuccess,
        contrastTextColorSuccessH,
        contrastTextColorSuccessS,
        contrastTextColorSuccessL,
        contrastTextColorSuccessA,
        contrastTextColorWarning,
        contrastTextColorWarningH,
        contrastTextColorWarningS,
        contrastTextColorWarningL,
        contrastTextColorWarningA,
        contrastTextColorDanger,
        contrastTextColorDangerH,
        contrastTextColorDangerS,
        contrastTextColorDangerL,
        contrastTextColorDangerA
    };
}
