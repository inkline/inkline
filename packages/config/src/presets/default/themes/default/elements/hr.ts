import { defineElement } from '../../../../../utils';

export const hr = defineElement({
    margin: {
        top: 'var(--margin-top)',
        right: 0,
        bottom: 'var(--margin-bottom)',
        left: 0
    },
    color: 'inherit',
    border: {
        top: {
            width: 'var(--border-top-width)',
            style: 'var(--border-top-style)',
            color: 'var(--border-top-color)'
        }
    }
});
