import type { RawThemeSizeMultiplier, RawThemeSizeMultiplierVariant } from '../../types';
import { addModifier, divideModifier, multiplyModifier, subtractModifier } from './generic';

export const sizeMultiplierModifiers: Record<
    keyof RawThemeSizeMultiplierVariant,
    (sizeMultiplier: RawThemeSizeMultiplier, value?: any) => string
> = {
    add: addModifier,
    subtract: subtractModifier,
    multiply: multiplyModifier,
    divide: divideModifier
};
