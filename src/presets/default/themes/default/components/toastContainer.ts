import type { RawTheme } from '../../../../../types';

export const toastContainer: RawTheme['components']['toastContainer'] = {
    default: {
        margin: {
            top: 'var(--margin-top)',
            right: 'var(--margin-right)',
            bottom: 'var(--margin-bottom)',
            left: 'var(--margin-left)'
        },
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 2010,
        toast: {
            margin: {
                bottom: 'var(--margin-bottom)'
            },
            transition: {
                property: 'transform, opacity',
                duration: 'var(--transition-duration)',
                timingFunction: 'var(--transition-timing-function)'
            }
        }
    }
};
