import type { RawTheme } from '../../../../../types';

export const formLabel: RawTheme['components']['formLabel'] = {
    default: {
        fontSize: 'var(--font-size)',
        margin: {
            top: 0,
            right: 0,
            bottom: 'var(--margin-bottom-1-4)',
            left: 0
        },
        transition: {
            property: 'color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        error: {
            color: 'var(--color-danger)'
        },
        inline: {
            margin: {
                left: 'var(--margin-left)',
                right: 'var(--margin-right)'
            }
        },
        required: {
            color: 'var(--color-danger)'
        }
    },
    sm: {
        fontSize: 'var(--font-size-sm)'
    },
    md: {
        fontSize: 'var(--font-size-md)'
    },
    lg: {
        fontSize: 'var(--font-size-lg)'
    }
};
