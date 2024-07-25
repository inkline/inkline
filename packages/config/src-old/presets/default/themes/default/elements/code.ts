import { defineElement } from '../../../../../utils';

export const code = defineElement({
    color: 'var(--color-pink)',
    background: 'var(--color-gray-50)',
    borderRadius: {
        topLeft: 'var(--border-top-left-radius)',
        topRight: 'var(--border-top-right-radius)',
        bottomRight: 'var(--border-bottom-right-radius)',
        bottomLeft: 'var(--border-bottom-left-radius)'
    },
    fontFamily: 'var(--font-family-monospace)',
    fontSize: 'var(--font-size)',
    padding: {
        top: '0.15rem',
        right: '0.45rem',
        bottom: '0.15rem',
        left: '0.45rem'
    }
});
