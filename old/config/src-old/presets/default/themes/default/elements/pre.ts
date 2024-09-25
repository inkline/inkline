import { defineElement } from '../../../../../utils';

export const pre = defineElement({
    fontFamily: 'var(--font-family-monospace)',
    fontSize: 'var(--font-size)',
    margin: {
        top: 0,
        right: 0,
        bottom: 'var(--margin-bottom)',
        left: 0
    }
});
