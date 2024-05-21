import type { RawTheme } from '../../../../../types';

const common: RawTheme['elements']['display'] = {
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

export const d1: RawTheme['elements']['d1'] = {
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-5) * var(--scale-ratio-pow-5))'
};

export const d2: RawTheme['elements']['d2'] = {
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-5) * var(--scale-ratio-pow-4))'
};

export const d3: RawTheme['elements']['d3'] = {
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-5) * var(--scale-ratio-pow-3))'
};

export const d4: RawTheme['elements']['d4'] = {
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-5) * var(--scale-ratio-pow-2))'
};

export const d5: RawTheme['elements']['d5'] = {
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-5) * var(--scale-ratio-pow-1))'
};

export const d6: RawTheme['elements']['d6'] = {
    ...common,
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-5))'
};
