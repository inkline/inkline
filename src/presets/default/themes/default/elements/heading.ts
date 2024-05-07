import type { RawTheme } from '../../../../../types';

const common: RawTheme['elements']['heading'] = {
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

export const h1: RawTheme['elements']['h1'] = {
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-5))'
};

export const h2: RawTheme['elements']['h2'] = {
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-4))'
};

export const h3: RawTheme['elements']['h3'] = {
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-3))'
};

export const h4: RawTheme['elements']['h4'] = {
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-2))'
};

export const h5: RawTheme['elements']['h5'] = {
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-1))'
};

export const h6: RawTheme['elements']['h6'] = {
    ...common,
    fontSize: 'var(--font-size)'
};
