import type { RawThemeGridGutter, RawThemeGridGutterVariant } from '../../types';
import { addModifier, divideModifier, multiplyModifier, subtractModifier } from './generic';

export const gutterModifiers: Record<
    keyof RawThemeGridGutterVariant,
    (gutter: RawThemeGridGutter, value?: any) => string
> = {
    add: addModifier,
    subtract: subtractModifier,
    multiply: multiplyModifier,
    divide: divideModifier
};
