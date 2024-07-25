import { defineElement } from '../../../../../utils';

export const caption = defineElement({
    padding: {
        top: 'calc(var(--padding-top) * var(--size-multiplier-sm))',
        right: 0,
        bottom: 'calc(var(--padding-bottom) * var(--size-multiplier-sm))',
        left: 0
    },
    color: 'var(--text-color-weaker)'
});
