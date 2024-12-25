import { defineElement } from '../../../../../utils';

export const p = defineElement({
    margin: {
        top: 0,
        right: 0,
        bottom: 'var(--margin-bottom)',
        left: 0
    }
});

export const lead = defineElement({
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-light)'
});

export const initialism = defineElement({
    fontSize: '90%',
    textTransform: 'uppercase'
});
