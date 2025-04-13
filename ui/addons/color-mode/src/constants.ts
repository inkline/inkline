import type { UserOptions } from '@inkline/types';

export const defaultColorModeAddonOptions: UserOptions['colorMode'] = {
    preference: 'system',
    strategy: 'localStorage',
    renderMode: 'client'
};
