import { spacingVariants } from '../../../common';
import { defineMargin, definePadding, defineSpacing } from '../../../../utils';

export const spacing = defineSpacing('1rem', {
    ...spacingVariants
});

export const margin = defineMargin('var(--spacing)', {
    ...spacingVariants
});

export const padding = definePadding('var(--spacing)', {
    ...spacingVariants
});
