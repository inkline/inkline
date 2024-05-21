import type { RawTheme } from '../../../../../types';

export const ol: RawTheme['elements']['ol'] = {
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 'var(--padding-left-lg)'
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

export const ul: RawTheme['elements']['ul'] = {
    ...ol
};

export const dl: RawTheme['elements']['dl'] = {
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
};

export const list: RawTheme['elements']['list'] = {
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 'var(--padding-left-lg)'
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
};
