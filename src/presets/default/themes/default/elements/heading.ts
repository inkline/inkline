import type { RawTheme } from '../../../../../types';

export const h1: RawTheme['elements']['h1'] = {
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-5))'
};

export const h2: RawTheme['elements']['h2'] = {
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-4))'
};

export const h3: RawTheme['elements']['h3'] = {
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-3))'
};

export const h4: RawTheme['elements']['h4'] = {
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-2))'
};

export const h5: RawTheme['elements']['h5'] = {
    fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-1))'
};

export const h6: RawTheme['elements']['h6'] = {
    fontSize: 'var(--font-size)'
};
