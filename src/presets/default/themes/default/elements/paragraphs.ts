import type { RawTheme } from '../../../../../types';

export const p: RawTheme['elements']['p'] = {
    margin: {
        top: 0,
        right: 0,
        bottom: 'var(--margin-bottom)',
        left: 0
    }
};

export const lead: RawTheme['elements']['lead'] = {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-light)'
};

export const initialism: RawTheme['elements']['initialism'] = {
    fontSize: '90%',
    textTransform: 'uppercase'
};
