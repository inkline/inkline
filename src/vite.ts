import { vitePlugin } from './plugin';
import { UserOptions } from './plugin/types';

import unocss from '@unocss/vite';
// import presetUno from '@unocss/preset-uno';
import { presetInkline } from './preset';

export const inkline = (options: UserOptions = {}) => {
    return [
        vitePlugin(options),
        unocss({
            presets: [
                presetInkline()
            ]
        })
    ];
};
