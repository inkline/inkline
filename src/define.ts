import { Configuration } from './types';
import { PartialDeep } from 'type-fest';

export function defineConfig (config: PartialDeep<Configuration>): PartialDeep<Configuration> {
    return config;
}
