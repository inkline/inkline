import type { RawTheme } from '../../../../../types';

export const formError: RawTheme['components']['formError'] = {
    default: {
        color: 'var(--color-danger)',
        fontSize: 'var(--font-size-sm)',
        margin: {
            top: 'var(--margin-top-1-4)',
            right: 0,
            bottom: 0,
            left: 0
        }
    }
};
