import { createFieldWithVariantsGenerateFn, defineGenerator } from '../utils';
import { GeneratorPriority, GeneratorType, ResolvedTheme } from '../types';
import { generateComponent } from './components';

export const elementsGenerator = defineGenerator<ResolvedTheme['elements'][string]>({
    key: 'elements.*',
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.Lowest,
    generate: createFieldWithVariantsGenerateFn(generateComponent)
});
