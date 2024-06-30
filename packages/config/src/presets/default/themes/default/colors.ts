import {
    colorLightnessVariants,
    colorShadeAndTintVariants,
    colorShadeVariants
} from '../../../common';
import { defineColorVariable, defineColorsGroup } from '../../../../utils';

export const colors = defineColorsGroup({
    red: defineColorVariable('#f55252'),
    orange: defineColorVariable('#f98e5a'),
    yellow: defineColorVariable('#ffda77'),
    green: defineColorVariable('#2fb079'),
    teal: defineColorVariable('#48b4a9'),
    blue: defineColorVariable('#178bb2'),
    purple: defineColorVariable('#8268ae'),
    pink: defineColorVariable('#fc778a'),
    white: defineColorVariable('#ffffff'),
    black: defineColorVariable('#000000'),
    gray: defineColorVariable('#8e9fa4', {
        ...colorShadeAndTintVariants,
        ...colorLightnessVariants
    }),
    light: defineColorVariable('var(--color-gray-50)', {
        ...colorShadeVariants
    }),
    dark: defineColorVariable('var(--color-gray-800)', {
        ...colorShadeAndTintVariants
    }),
    primary: defineColorVariable('var(--color-blue)', {
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    }),
    secondary: defineColorVariable('var(--color-purple)', {
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    }),
    info: defineColorVariable('var(--color-teal)', {
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    }),
    success: defineColorVariable('var(--color-green)', {
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    }),
    warning: defineColorVariable('var(--color-yellow)', {
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    }),
    danger: defineColorVariable('var(--color-red)', {
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    })
});
