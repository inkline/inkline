import type { RawTheme } from '../../../../../types';

export const layoutAside: RawTheme['components']['layoutAside'] = {
    default: {
        width: '320px',
        transition: {
            property: 'width, height',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        }
    }
};
