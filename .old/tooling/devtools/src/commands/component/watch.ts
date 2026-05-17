import { viteWatch } from '../vite';
import { WatchCommandOptions } from '../../types';

export async function componentWatch(options: WatchCommandOptions) {
    return viteWatch(options);
}
