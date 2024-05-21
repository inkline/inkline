import type { RawTheme } from '../../../../../types';

export const expandTransition: RawTheme['components']['expandTransition'] = {
    default: {
        transition: {
            property: 'height',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        }
    }
};
