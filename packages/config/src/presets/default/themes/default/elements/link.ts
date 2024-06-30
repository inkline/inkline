import { defineElement } from '../../../../../utils';

export const link = defineElement({
    color: 'var(--color-primary-500)',
    textDecoration: 'none',
    hover: {
        color: 'var(--color-primary-600)',
        textDecoration: 'underline'
    }
});
