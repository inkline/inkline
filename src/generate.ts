import { ResolvedConfiguration } from './types';
import { applyGenerators } from './apply';

export function generate (config: ResolvedConfiguration): string {
    return applyGenerators(config as ResolvedConfiguration, config.theme)
        .map(({ value }) => value.join('\n')).join('\n\n');
}
