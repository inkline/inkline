import { spacingVariants } from '../../../common';
import {
    defineMarginVariable,
    definePaddingVariable,
    defineSpacingVariable
} from '../../../../utils';

export const spacing = defineSpacingVariable('1rem', {
    ...spacingVariants
});

export const margin = defineMarginVariable('var(--spacing)', {
    ...spacingVariants
});

export const padding = definePaddingVariable('var(--spacing)', {
    ...spacingVariants
});
