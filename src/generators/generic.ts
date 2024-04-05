import {
    codegenCssVariables,
    createFieldWithVariantsGenerateFn,
    defineGenerator,
    defineGeneratorValueFn,
    getResolvedPath,
    toKebabCase
} from '../utils';
import { GeneratorType } from '../types';

export const generateGeneric = defineGeneratorValueFn<string | number>((value, meta) => {
    const path = getResolvedPath(meta);

    return [
        codegenCssVariables.set(
            path
                .filter((part) => part !== 'default')
                .map((part) => toKebabCase(part))
                .join('--'),
            `${value}`
        )
    ];
});

export const genericFieldWithVariantsGenerator = defineGenerator<any>({
    key: '**',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(generateGeneric)
});

export const genericFieldGenerator = defineGenerator<any>({
    key: '**',
    type: GeneratorType.CssVariables,
    generate: generateGeneric
});
