import { defineGenerator } from '../utils';
import { GeneratorPriority, GeneratorType, ResolvedTheme } from '../types';

export const layersGenerator = defineGenerator<ResolvedTheme['layers']>({
    key: 'layers',
    priority: GeneratorPriority.Highest,
    type: GeneratorType.Default,
    generate: (layers) => layers.map((layer) => `@layer ${layer};`)
});
