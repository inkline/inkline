import { defineElement } from '../../../../../utils';

export const body = defineElement({
    background: 'var(--color-white)',
    color: 'var(--text-color-dark)',
    fontSize: 'var(--font-size)',
    fontFamily: 'var(--font-family)',
    fontWeight: 'var(--font-weight)',
    lineHeight: 'var(--line-height)',
    textAlign: 'var(--text-align)',
    transition: {
        property: 'background-color, color',
        duration: 'var(--transition-duration)',
        timingFunction: 'var(--transition-timing-function)'
    }
});
