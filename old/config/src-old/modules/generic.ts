import {
    codegenCssVariables,
    defineGenerator,
    defineGeneratorValueFn,
    defineResolver,
    defineResolverValueFn,
    getCssVariableName,
    getCssVariablePreamble,
    getCssVariablePreamblePath
} from '../utils';
import { GeneratorOutput } from '../types';

/**
 * Types
 */

export type RawThemeGenericValue = string | number;

export type RawThemeGenericVariant = {
    add?: string | number;
    subtract?: string | number;
    multiply?: string | number;
    divide?: string | number;
    [key: string]: string | number | undefined;
};

/**
 * Resolver
 */

export const genericResolver = defineResolver({
    key: '**',
    resolve: defineResolverValueFn((value) => value)
});

/**
 * Generator
 */

export const generateGeneric = defineGeneratorValueFn<string | number>((value, meta) => {
    const variablePreamblePath = getCssVariablePreamblePath(meta);
    const variablePreamble = getCssVariablePreamble(variablePreamblePath);
    const variableName = getCssVariableName(meta);

    return [codegenCssVariables.set(`${variablePreamble}${variableName}`, `${value}`)];
});

export const genericFieldGenerator = defineGenerator<any>({
    key: /.*/,
    output: GeneratorOutput.CssVariables,
    generate: generateGeneric
});
