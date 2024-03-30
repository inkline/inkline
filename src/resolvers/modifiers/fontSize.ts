import type { RawThemeTypographyFontSize, RawThemeTypographyFontSizeVariant } from '../../types';
import { addModifier, divideModifier, multiplyModifier, subtractModifier } from './generic';

export const fontSizeModifiers: Record<
    keyof RawThemeTypographyFontSizeVariant,
    (fontSize: RawThemeTypographyFontSize, value?: any) => string
> = {
    add: addModifier,
    subtract: subtractModifier,
    multiply: multiplyModifier,
    divide: divideModifier
};
