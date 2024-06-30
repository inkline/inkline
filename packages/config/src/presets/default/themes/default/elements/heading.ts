import { defineElement } from '../../../../../utils';

const common = {
    margin: {
        top: 0,
        right: 0,
        bottom: 'var(--margin-bottom)',
        left: 0
    },
    fontFamily: 'var(--font-family-base-secondary)',
    fontStyle: 'var(--font-style-normal)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'inherit',
    lineHeight: 1.2
};

export const h1 = defineElement({
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-5))'
});

export const h2 = defineElement({
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-4))'
});

export const h3 = defineElement({
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-3))'
});

export const h4 = defineElement({
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-2))'
});

export const h5 = defineElement({
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-1))'
});

export const h6 = defineElement({
    ...common,
    fontSize: 'var(--font-size)'
});
