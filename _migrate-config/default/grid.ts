import { sizeMultiplierVariants } from '../../../common';
import {
    defineColumnsVariable,
    defineContainerVariable,
    defineGroup,
    defineGutterVariable
} from '../../../../utils';

export const grid = defineGroup({
    columns: defineColumnsVariable(12),
    gutter: defineGutterVariable('28px', {
        ...sizeMultiplierVariants,
        xxl: { multiply: 'var(--size-multiplier-xxl)' }
    }),
    container: defineContainerVariable('100%', {
        xs: '100%',
        sm: 'calc(var(--breakpoint-sm) - var(--gutter-sm))',
        md: 'calc(var(--breakpoint-md) - var(--gutter-md))',
        lg: 'calc(var(--breakpoint-lg) - var(--gutter-lg))',
        xl: 'calc(var(--breakpoint-xl) - var(--gutter-xl))',
        xxl: 'calc(var(--breakpoint-xxl) - var(--gutter-xxl))'
    })
});
