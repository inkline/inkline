import {
    colorLightnessVariants,
    colorShadeAndTintVariants,
    colorShadeVariants
} from '../../../common';
import { defineColor } from '../../../../utils';
import type { RawTheme } from '../../../../types';

export const colors: RawTheme['colors'] = {
    red: defineColor('#f55252'),
    orange: defineColor('#f98e5a'),
    yellow: defineColor('#ffda77'),
    green: defineColor('#2fb079'),
    teal: defineColor('#48b4a9'),
    blue: defineColor('#178bb2'),
    purple: defineColor('#8268ae'),
    pink: defineColor('#fc778a'),
    white: defineColor('#ffffff'),
    black: defineColor('#000000'),
    gray: defineColor('#8e9fa4', {
        ...colorShadeAndTintVariants,
        ...colorLightnessVariants
    }),
    light: defineColor('var(--color-gray-50)', {
        ...colorShadeVariants
    }),
    dark: defineColor('var(--color-gray-800)', {
        ...colorShadeAndTintVariants
    }),
    primary: defineColor('var(--color-blue)', {
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    }),
    secondary: defineColor('var(--color-purple)', {
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    }),
    info: defineColor('var(--color-teal)', {
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    }),
    success: defineColor('var(--color-green)', {
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    }),
    warning: defineColor('var(--color-yellow)', {
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    }),
    danger: defineColor('var(--color-red)', {
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    })
};
