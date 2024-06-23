import { defineTextColorVariable } from '../../../../utils';

export const textColor = defineTextColorVariable('', {
    weak: 'var(--color-gray-300)',
    weaker: 'var(--color-gray-500)',
    weakest: 'var(--color-gray-700)'
});
