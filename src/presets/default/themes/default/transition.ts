import type { RawTheme } from '../../../../types';

export const transition: RawTheme['transition'] = {
    default: {
        property: 'color, background-color, border-color',
        duration: '300ms',
        timingFunction: 'ease'
    }
};
