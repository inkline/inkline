import type { RawThemeSpacing, RawThemeSpacingVariant } from '../../types';
import { addModifier, divideModifier, multiplyModifier, subtractModifier } from './generic';

export const spacingModifiers: Record<
    keyof RawThemeSpacingVariant,
    (sizeMultiplier: RawThemeSpacing, value?: any) => string
> = {
    add: addModifier,
    subtract: subtractModifier,
    multiply: multiplyModifier,
    divide: divideModifier
};
