import { defineElement } from '../../../../../utils';

const listBase = {
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 'calc(var(--padding-left) * var(--size-multiplier-lg))'
    },
    margin: {
        top: 0,
        right: 0,
        bottom: 'var(--margin-bottom)',
        left: 0
    },
    li: {
        margin: {
            top: 0,
            right: 0,
            bottom: 'var(--margin-bottom-1-2)',
            left: 0
        }
    }
};

export const ol = defineElement({ ...listBase });

export const ul = defineElement({ ...listBase });

export const dl = defineElement({
    margin: {
        top: 0,
        right: 0,
        bottom: 'var(--margin-bottom)',
        left: 0
    },
    dt: {
        fontWeight: 'var(--font-weight-bold)'
    },
    dd: {
        margin: {
            top: 0,
            right: 0,
            bottom: 'var(--margin-bottom-1-2)',
            left: 0
        }
    }
});

export const list = defineElement({
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 'calc(var(--padding-left) * var(--size-multiplier-lg))'
    },
    margin: {
        top: 0,
        right: 0,
        bottom: 'var(--margin-bottom)',
        left: 0
    },
    item: {
        margin: {
            top: 0,
            right: 0,
            bottom: 'var(--margin-bottom-1-2)',
            left: 0
        }
    },
    inline: {
        item: {
            margin: {
                top: 0,
                right: 'var(--margin-right)',
                bottom: 0,
                left: 0
            }
        }
    }
});
