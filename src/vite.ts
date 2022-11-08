import { vitePlugin as inklinePlugin } from './plugin';
import { UserOptions } from './plugin/types';
import unocssPlugin from '@unocss/vite';
import { build } from './plugin/build';

export const inkline = async (options: UserOptions = {}) => {
    await build(options);

    return [
        inklinePlugin(options),
        ...(options.unocss ? [unocssPlugin(options.unocss)] : [])
    ];
};
